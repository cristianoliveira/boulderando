import { byDataTestId } from '../support/data-testid'
import * as TID from '../../src/constants/data-testid'
import * as NB_TID from '../../src/components/NavBar'

import person from '../fixtures/persons/valid.json'

describe('User Data Form', () => {
  afterEach(() => {
    cy.localStorage().then((ls) => ls.removeItem('user'))
  })

  it('requires user booking data', () => {
    cy.visit('/')

    cy.get(byDataTestId(TID.USER_INPUT_FIRST_NAME)).should('exist')
    cy.get(byDataTestId(TID.USER_INPUT_LAST_NAME)).should('exist')
    cy.get(byDataTestId(TID.USER_INPUT_BIRTHDAY)).should('exist')
    cy.get(byDataTestId(TID.USER_INPUT_STREET_ADDRESS)).should('exist')
    cy.get(byDataTestId(TID.USER_INPUT_POSTALCODE)).should('exist')
    cy.get(byDataTestId(TID.USER_INPUT_CITY)).should('exist')
    cy.get(byDataTestId(TID.USER_INPUT_EMAIL)).should('exist')
    cy.get(byDataTestId(TID.USER_INPUT_PHONE_NUMBER)).should('exist')
    cy.get(byDataTestId(TID.USER_INPUT_URBAN_SPORT_NUMBER)).should('exist')

    cy.get(byDataTestId(TID.USER_FORM_SUBMIT_BUTTON)).should('exist').click()

    cy.get(byDataTestId(TID.USER_FORM_ERROR_MESSAGE_CONTAINER))
      .should('exist')
      .contains('All fields are required')

    cy.get(byDataTestId(TID.USER_INPUT_FIRST_NAME))
      .should('exist')
      .type(person.name)
    cy.get(byDataTestId(TID.USER_INPUT_LAST_NAME))
      .should('exist')
      .type(person.last_name)
    cy.get(byDataTestId(TID.USER_INPUT_BIRTHDAY))
      .should('exist')
      .type(person.birthday)
    cy.get(byDataTestId(TID.USER_INPUT_POSTALCODE))
      .should('exist')
      .type(person.postal_code)
    cy.get(byDataTestId(TID.USER_INPUT_CITY)).should('exist').type(person.city)
    cy.get(byDataTestId(TID.USER_INPUT_EMAIL))
      .should('exist')
      .type(person.email)
    cy.get(byDataTestId(TID.USER_INPUT_PHONE_NUMBER))
      .should('exist')
      .type(person.phone_number)

    cy.get(byDataTestId(TID.USER_FORM_ERROR_MESSAGE_CONTAINER))
      .should('exist')
      .contains('usc_number')
  })

  it('collects and store locally user data', () => {
    cy.visit('/')

    cy.get(byDataTestId(TID.USER_INPUT_FIRST_NAME))
      .should('exist')
      .type(person.name)
    cy.get(byDataTestId(TID.USER_INPUT_LAST_NAME))
      .should('exist')
      .type(person.last_name)
    cy.get(byDataTestId(TID.USER_INPUT_BIRTHDAY))
      .should('exist')
      .type(person.birthday)
    cy.get(byDataTestId(TID.USER_INPUT_STREET_ADDRESS))
      .should('exist')
      .type(person.address)
    cy.get(byDataTestId(TID.USER_INPUT_POSTALCODE))
      .should('exist')
      .type(person.postal_code)
    cy.get(byDataTestId(TID.USER_INPUT_CITY)).should('exist').type(person.city)
    cy.get(byDataTestId(TID.USER_INPUT_EMAIL))
      .should('exist')
      .type(person.email)
    cy.get(byDataTestId(TID.USER_INPUT_PHONE_NUMBER))
      .should('exist')
      .type(person.phone_number)
    cy.get(byDataTestId(TID.USER_INPUT_URBAN_SPORT_NUMBER))
      .should('exist')
      .type(person.usc_number)

    cy.get(byDataTestId(TID.USER_FORM_SUBMIT_BUTTON)).should('exist').click()

    cy.getLocalStorage('user').then((user) => expect(user).deep.equal(person))

    cy.url().should('include', '/')

    cy.get(byDataTestId(NB_TID.NAVBAR_USER_MENU_BUTTON))
  })

  it('can edit user data', () => {
    cy.setLocalStorage('user', person)

    cy.visit('/user/edit')

    cy.get(byDataTestId(TID.USER_INPUT_FIRST_NAME))
      .find('input')
      .should('have.value', person.name)
    cy.get(byDataTestId(TID.USER_INPUT_LAST_NAME))
      .find('input')
      .should('have.value', person.last_name)
    cy.get(byDataTestId(TID.USER_INPUT_BIRTHDAY))
      .find('input')
      .should('have.value', person.birthday)
    cy.get(byDataTestId(TID.USER_INPUT_STREET_ADDRESS))
      .find('input')
      .should('have.value', person.address)
    cy.get(byDataTestId(TID.USER_INPUT_POSTALCODE))
      .find('input')
      .should('have.value', person.postal_code)
    cy.get(byDataTestId(TID.USER_INPUT_CITY))
      .find('input')
      .should('have.value', person.city)
    cy.get(byDataTestId(TID.USER_INPUT_EMAIL))
      .find('input')
      .should('have.value', person.email)
    cy.get(byDataTestId(TID.USER_INPUT_PHONE_NUMBER))
      .find('input')
      .should('have.value', person.phone_number)
    cy.get(byDataTestId(TID.USER_INPUT_URBAN_SPORT_NUMBER))
      .find('input')
      .should('have.value', person.usc_number)

    cy.get(byDataTestId(TID.USER_INPUT_URBAN_SPORT_NUMBER))
      .find('input')
      .should('have.value', person.usc_number)

    cy.get(byDataTestId(TID.USER_INPUT_FIRST_NAME))
      .find('input')
      .type(' NewName')

    cy.get(byDataTestId(TID.USER_FORM_SUBMIT_BUTTON)).should('exist').click()

    cy.getLocalStorage('user').then(async (user) => {
      await expect(user.name).equal('John NewName')
    })
  })
})
