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
    cy.visit('http://localhost:3333/')
    cy.get(byDataTestId(NB_TID.NAVBAR_CONTAINER)).should('be.visible')

    withUser()

    cy.visit('http://localhost:3333/sessions')
    cy.get(byDataTestId(NB_TID.NAVBAR_CONTAINER)).should('be.visible')
  })

  describe('when a user is registered', () => {
    beforeEach(() => {
      withUser()
      cy.visit('http://localhost:3333/')
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

      cy.url().should('include', '/user/new')

      cy.getLocalStorage('user').then((user) => {
        expect(user).equal(null)
      })
    })
  })
})
