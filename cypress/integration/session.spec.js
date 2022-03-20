import { byDataTestId } from '../support/data-testid'
import * as TID from '../../src/constants/data-testid'

import * as SL_TID from '../../src/components/Sessions/SessionList'
import * as NB_TID from '../../src/components/NavBar'

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

  it('has options for a tuesday, thursday and saturday by default', () => {
    cy.contains('tuesday').should('exist')
    cy.contains('thursday').should('exist')
    cy.contains('saturday').should('exist')

    cy.contains('basement').should('exist')
    cy.contains('boulderklub').should('exist')
  })

  it('allows adding and deleting custom session', () => {
    cy.get(byDataTestId(SL_TID.SESSION_LIST_TABLE_ITEM)).should('have.length', 4)

    cy.get(byDataTestId(NB_TID.NAVBAR_NAVIGATION_MENU_BUTTON)).click()
    cy.get(byDataTestId(NB_TID.NAVBAR_NAVIGATION_MENU_ITEM_CUSTOM_ADD)).click()

    cy.get(byDataTestId(TID.CUSTOM_SESSION_FORM_GYM)).click()
    cy.get(byDataTestId('option--basement')).click()

    cy.get(byDataTestId(TID.CUSTOM_SESSION_FORM_DAY)).click()
    cy.get(byDataTestId('option--this tuesday')).click()

    cy.get(byDataTestId(TID.CUSTOM_SESSION_FORM_TIME)).click()
    cy.get(byDataTestId('option--12:00 - 14:00')).click()

    cy.get(byDataTestId(TID.CUSTOM_SESSION_FORM_SUBMIT_BUTTON)).click()

    cy.contains('12:00 - 14:00').should('exist')

    cy.get(byDataTestId(SL_TID.SESSION_LIST_TABLE_ITEM)).should('have.length', 5)

    cy.get(byDataTestId(NB_TID.NAVBAR_NAVIGATION_MENU_BUTTON)).click()
    cy.get(byDataTestId(NB_TID.NAVBAR_NAVIGATION_MENU_ITEM_CUSTOM_DELETE)).click()

    cy.get(byDataTestId(SL_TID.SESSION_LIST_TABLE_ITEM)).should('have.length', 0)
  })
})
