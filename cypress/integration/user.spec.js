import { byDataTestId } from '../support/data-testid'
import * as TID from '../../src/constants/data-testid'

import person from '../fixtures/persons/valid.json'

describe('User Data Form', () => {
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
      .type(person.lastName)
    cy.get(byDataTestId(TID.USER_INPUT_BIRTHDAY))
      .should('exist')
      .type(person.birthday)
    cy.get(byDataTestId(TID.USER_INPUT_POSTALCODE))
      .should('exist')
      .type(person.address.postalCode)
    cy.get(byDataTestId(TID.USER_INPUT_CITY))
      .should('exist')
      .type(person.address.city)
    cy.get(byDataTestId(TID.USER_INPUT_EMAIL))
      .should('exist')
      .type(person.email)
    cy.get(byDataTestId(TID.USER_INPUT_PHONE_NUMBER))
      .should('exist')
      .type(person.phoneNumber)

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
      .type(person.lastName)
    cy.get(byDataTestId(TID.USER_INPUT_BIRTHDAY))
      .should('exist')
      .type(person.birthday)
    cy.get(byDataTestId(TID.USER_INPUT_STREET_ADDRESS))
      .should('exist')
      .type(person.address.street)
    cy.get(byDataTestId(TID.USER_INPUT_POSTALCODE))
      .should('exist')
      .type(person.address.postalCode)
    cy.get(byDataTestId(TID.USER_INPUT_CITY))
      .should('exist')
      .type(person.address.city)
    cy.get(byDataTestId(TID.USER_INPUT_EMAIL))
      .should('exist')
      .type(person.email)
    cy.get(byDataTestId(TID.USER_INPUT_PHONE_NUMBER))
      .should('exist')
      .type(person.phoneNumber)
    cy.get(byDataTestId(TID.USER_INPUT_URBAN_SPORT_NUMBER))
      .should('exist')
      .type(person.urbanSportNumber)

    cy.get(byDataTestId(TID.USER_FORM_SUBMIT_BUTTON)).should('exist').click()

    cy.window().then(w => {
      expect(w.localStorage.getItem('user')).not.include({ first_name: person.name })
    })
  })
})
