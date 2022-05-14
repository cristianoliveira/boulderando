import { byDataTestId } from '../support/data-testid'

import person from '../fixtures/persons/valid.json'

import * as NB_TID from '../../src/components/NavBar'

const withUser = () => {
  cy.setLocalStorage('user', person)
}

const cleanUpUser = () => {
  cy.removeLocalStorage('user')
}

describe('Navigation Bar', () => {
  beforeEach(() => {
    cy.viewport('iphone-7')
  })

  afterEach(cleanUpUser)

  it('always is present', () => {
    cy.visit('/')
    cy.get(byDataTestId(NB_TID.NAVBAR_CONTAINER)).should('be.visible')

    withUser()

    cy.visit('/sessions')
    cy.get(byDataTestId(NB_TID.NAVBAR_CONTAINER)).should('be.visible')
  })

  it('allows user to navigate through the pages', () => {
    cy.visit('/')
    cy.get(byDataTestId(NB_TID.NAVBAR_NAVIGATION_MENU_BUTTON))
      .should('be.visible')
      .click()
    cy.get(byDataTestId(NB_TID.NAVBAR_NAVIGATION_MENU_ITEM_SESSION)).should(
      'have.attr','aria-disabled', 'true'
    )
    cy.get(byDataTestId(NB_TID.NAVBAR_NAVIGATION_MENU_ITEM_HISTORY)).should(
      'have.attr','aria-disabled', 'true'
    )

    withUser()
    cy.visit('/')

    cy.get(byDataTestId(NB_TID.NAVBAR_NAVIGATION_MENU_BUTTON))
      .should('be.visible')
      .click()

    cy.get(byDataTestId(NB_TID.NAVBAR_NAVIGATION_MENU_ITEM_HISTORY))
      .should('be.visible')
      .click()

    cy.url().should('include', '/booking-history')

    cy.get(byDataTestId(NB_TID.NAVBAR_NAVIGATION_MENU_BUTTON))
      .should('be.visible')
      .click()

    cy.get(byDataTestId(NB_TID.NAVBAR_NAVIGATION_MENU_ITEM_SESSION))
      .should('be.visible')
      .click()

    cy.url().should('include', '/session')

  })

  describe('when a user is registered', () => {
    beforeEach(() => {
      withUser()
      cy.visit('/')
    })

    it('gives options to edit user', () => {
      //
      //
      cy.get(byDataTestId(NB_TID.NAVBAR_CONTAINER)).should('be.visible')
      cy.get(byDataTestId(NB_TID.NAVBAR_USER_MENU_BUTTON))
        .should('be.visible')
        .click()

      cy.get(byDataTestId(NB_TID.NAVBAR_USER_MENU_ITEM_EDIT))
        .should('be.visible')
        .click()

      cy.url().should('include', '/user/edit')
    })

    it('gives options to delete and add new user', () => {
      cy.get(byDataTestId(NB_TID.NAVBAR_CONTAINER)).should('be.visible')
      cy.get(byDataTestId(NB_TID.NAVBAR_USER_MENU_BUTTON))
        .should('be.visible')
        .click()

      cy.get(byDataTestId(NB_TID.NAVBAR_USER_MENU_ITEM_DELETE))
        .should('be.visible')
        .click()

      cy.url().should('include', '/user/invite')

      cy.getLocalStorage('user').then((user) => {
        expect(user).equal(null)
      })
    })
  })
})
