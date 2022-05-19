import dayjs from 'dayjs'
import { byDataTestId } from '../support/data-testid'
import * as TID from '../../src/constants/data-testid'

import person from '../fixtures/persons/placeholder.json'

describe('Bouldering Session Selection', () => {
  it(
    'allows booking bouldering sessions',
    { defaultCommandTimeout: 20000 },
    () => {
      if (Cypress.env('SMOKE_TEST_IGNORE')) {
        return
      }

      cy.visit(
        `/user/new?telegram_id=${Cypress.env('SMOKE_TEST_USER_TELEGRAM_ID')}`
      )

      cy.get(byDataTestId(TID.USER_INPUT_FIRST_NAME))
        .should('exist')
        .type(cy.getEnv('SMOKE_TEST_USER_NAME'))
      cy.get(byDataTestId(TID.USER_INPUT_LAST_NAME))
        .should('exist')
        .type(cy.getEnv('SMOKE_TEST_USER_LAST_NAME'))
      cy.get(byDataTestId(TID.USER_INPUT_BIRTHDAY))
        .should('exist')
        .type(person.birthday)
      cy.get(byDataTestId(TID.USER_INPUT_STREET_ADDRESS))
        .should('exist')
        .type(person.address)
      cy.get(byDataTestId(TID.USER_INPUT_POSTALCODE))
        .should('exist')
        .type(person.postal_code)
      cy.get(byDataTestId(TID.USER_INPUT_CITY))
        .should('exist')
        .type(person.city)
      cy.get(byDataTestId(TID.USER_INPUT_EMAIL))
        .should('exist')
        .type(cy.getEnv('SMOKE_TEST_USER_EMAIL'))
      cy.get(byDataTestId(TID.USER_INPUT_PHONE_NUMBER))
        .should('exist')
        .type(cy.getEnv('SMOKE_TEST_USER_PHONE'))
      cy.get(byDataTestId(TID.USER_INPUT_URBAN_SPORT_NUMBER))
        .should('exist')
        .type(cy.getEnv('SMOKE_TEST_URBAN_SPORTS_NO'))

      cy.get(byDataTestId(TID.USER_FORM_SUBMIT_BUTTON)).should('exist').click()

      cy.url().should('not.include', '/user/new')
      cy.url().should('not.include', '/user/edit')

      cy.visit('/sessions?dry_run')

      const day = dayjs().format('dddd').toLowerCase();
      cy.contains(day).parent().find('button').click()
      cy.get(byDataTestId(TID.SESSION_FORM_SUCCESS_MESSAGE_CONTAINER))
        .should('be.visible')
        .should('contain', day)
    }
  )
})
