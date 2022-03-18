import dayjs from 'dayjs';

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

    cy.visit('/sessions')
    // TODO move this dry_run to a ENV variable
    // eslint-disable-next-line
    cy.window().then((w) => (w.dry_run = true))
  })

  it('allows booking bouldering sessions', () => {
    cy.contains('saturday').parent().find('button').click()
dayjs.add(-1,)
    cy.get(byDataTestId(TID.SESSION_FORM_SUCCESS_MESSAGE_CONTAINER), {
      timeout: 20000,
    })
      .should('be.visible')
      .should('contain', 'saturday')

    cy.get(byDataTestId(TID.SESSION_FORM_ERROR_MESSAGE_CONTAINER)).should(
      'not.exist'
    )

      .should('be.visible')
      .click()

    cy.contains('basement').should('be.visible')
    cy.contains('saturday').should('be.visible')
  })
})
