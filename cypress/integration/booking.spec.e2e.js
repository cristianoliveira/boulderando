import { byDataTestId } from '../support/data-testid'
import * as TID from '../../src/constants/data-testid'

import person from '../fixtures/persons/valid.json'

describe('Bouldering Session Selection', () => {
  beforeEach(() => {
    cy.viewport('iphone-7')
  })


  afterEach(() => {
    cy.removeLocalStorage('user')
    cy.removeLocalStorage('sessions')
    cy.localStorage((ls) => {
      expect(ls.getItem('user')).equal(null)
      expect(ls.getItem('sessions')).equal(null)
    })
  })

  beforeEach(() => {
    cy.setLocalStorage('user', person)

    cy.visit('/sessions?dry_run')
  })

  it('allows booking bouldering sessions', () => {
    cy.contains('saturday').parent().find('button').click()
    cy.get(byDataTestId(TID.SESSION_FORM_SUCCESS_MESSAGE_CONTAINER), {
      timeout: 20000,
    })
      .should('be.visible')
      .should('contain', 'saturday')

    cy.get(byDataTestId(TID.SESSION_FORM_ERROR_MESSAGE_CONTAINER)).should(
      'not.exist'
    )

    cy.contains('basement').should('be.visible')
    cy.contains('saturday').should('be.visible')
  })
})
