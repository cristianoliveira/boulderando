import { byDataTestId } from '../support/data-testid'
import * as TID from '../../src/constants/data-testid'

import person from '../fixtures/persons/valid.json'

describe('Bouldering Session Selection', () => {
  afterEach(() => {
    cy.window().then((w) => {
      w.localStorage.removeItem('user')
      w.localStorage.removeItem('sessions')
      expect(w.localStorage.getItem('user')).equal(null)
      expect(w.localStorage.getItem('sessions')).equal(null)
    })
  })

  beforeEach(() => {
    cy.window().then((w) => {
      w.dry_run = true
      w.localStorage.setItem('user', JSON.stringify(person))
      expect(w.localStorage.getItem('user')).not.equal(null)
    })

    cy.visit('http://localhost:3333/sessions')
    cy.window().then((w) => { w.dry_run = true })
  })

  it('has options for a tuesday, thursday and saturday by default', () => {
    cy.contains('tuesday').should('exist')
    cy.contains('thursday').should('exist')
    cy.contains('saturday').should('exist')

    cy.contains('basement').should('exist')
    cy.contains('boulderklub').should('exist')
  })

  it('allows booking bouldering sessions', () => {
    cy.contains('saturday').parent().find('button').click()
    cy.get(byDataTestId(TID.SESSION_FORM_SUCCESS_MESSAGE_CONTAINER), {
      timeout: 20000,
    }).should('be.visible').should('contain', 'saturday')
  })

  it('allows adding custom session', () => {
    cy.get(byDataTestId(TID.SESSION_FORM_ADD_CUSTOM_SESSION)).click()

    cy.get(byDataTestId(TID.CUSTOM_SESSION_FORM_GYM)).click()
    cy.get(byDataTestId('option--basement')).click()

    cy.get(byDataTestId(TID.CUSTOM_SESSION_FORM_DAY)).click()
    cy.get(byDataTestId('option--this tuesday')).click()

    cy.get(byDataTestId(TID.CUSTOM_SESSION_FORM_TIME)).click()
    cy.get(byDataTestId('option--12:00 - 14:00')).click()

    cy.get(byDataTestId(TID.CUSTOM_SESSION_FORM_SUBMIT_BUTTON)).click()

    cy.contains('12:00 - 14:00').should('exist')
  });
})
