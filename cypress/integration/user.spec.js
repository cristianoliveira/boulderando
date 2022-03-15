import { byDataTestId } from '../support/data-testid'
import * as TID from '../../src/constants/data-testid'

import person from '../fixtures/persons/valid.json'

describe('User Data Form', () => {
  afterEach(() => {
    cy.window().then((w) => {
      w.localStorage.removeItem('user')
      expect(w.localStorage.getItem('user')).equal(null)
    })
  })

  it('requires user booking data', () => {
    cy.visit('http://localhost:3333/')

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
    cy.visit('http://localhost:3333/')

    cy.get(byDataTestId(TID.USER_INPUT_FIRST_NAME))
      .should('exist')
      .type(person.name)
    cy.get(byDataTestId(TID.USER_INPUT_LAST_NAME))
      .should('exist')
      .type(person.laaaast_name)
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

    cy.window().then((w) => {
      expect(JSON.parse(w.localStorage.getItem('user'))).include(person)
    })
  })

  it.only('can edit user data', () => {
    cy.window().then((w) => {
      w.localStorage.setItem('user', JSON.stringify(person))
      expect(JSON.parse(w.localStorage.getItem('user'))).include(person)
    })

    cy.visit('http://localhost:3333/edit')

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

    cy.get(byDataTestId(TID.USER_INPUT_FIRST_NAME)).type(' NewName')

    cy.get(byDataTestId(TID.USER_FORM_SUBMIT_BUTTON)).should('exist').click()

    cy.window().then((w) => {
      expect(JSON.parse(w.localStorage.getItem('user'))).include({
        name: 'John NewName',
      })
    })
  })
})
