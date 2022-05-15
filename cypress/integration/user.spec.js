import { byDataTestId } from '../support/data-testid'
import * as TID from '../../src/constants/data-testid'
import * as NB_TID from '../../src/components/NavBar/data-testid'

import person from '../fixtures/persons/valid.json'
import telegramPerson from '../fixtures/persons/telegram.json'

describe('User Data Form', () => {
  beforeEach(() => {
    cy.localStorage().then((ls) => ls.removeItem('user'))
  })

  it('shows a invite link for unkown users (without telegram id)', () => {
    cy.visit('/')

    cy.get(byDataTestId(TID.USER_TELEGRAM_GROUP_LINK))
      .should('be.visible')
      .click()

    cy.url().should('contain', 'https://t.me')
  })

  it('shows a invite link for kown users (without telegram id)', () => {
    const newEmail = 'newemail@foobar.com'
    const newTelegramId = '99999'
    cy.setLocalStorage('user', {
      ...telegramPerson,
      telegram_id: null,
    })
    cy.visit(`/user/new?telegram_id=${newTelegramId}`)

    cy.url().should('contain', `/user/edit?telegram_id=${newTelegramId}`)

    cy.get(byDataTestId(TID.USER_INPUT_EMAIL))
      .should('exist')
      .find('input')
      .clear()

    cy.get(byDataTestId(TID.USER_INPUT_EMAIL)).type(newEmail)

    cy.get(byDataTestId(TID.USER_FORM_SUBMIT_BUTTON)).should('exist').click()

    cy.url().should('not.include', '/user/edit')

    cy.getLocalStorage('user').then((user) =>
      expect(user).deep.equal({
        ...telegramPerson,
        email: newEmail,
        telegram_id: newTelegramId,
      })
    )
  })

  it('collects and store locally user data', () => {
    cy.visit(`/user/new?telegram_id=${person.telegram_id}`)

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

    cy.url().should('not.include', '/user/new')
    cy.url().should('not.include', '/user/edit')

    cy.getLocalStorage('user').then((user) => expect(user).deep.equal(person))

    cy.get(byDataTestId(NB_TID.NAVBAR_USER_MENU_BUTTON))
  })

  it('vinculates the user to the given telegram id', () => {
    cy.visit(`/user/new?telegram_id=${telegramPerson.telegram_id}`)

    cy.get(byDataTestId(TID.USER_INPUT_FIRST_NAME))
      .should('exist')
      .type(telegramPerson.name)
    cy.get(byDataTestId(TID.USER_INPUT_LAST_NAME))
      .should('exist')
      .type(telegramPerson.last_name)
    cy.get(byDataTestId(TID.USER_INPUT_BIRTHDAY))
      .should('exist')
      .type(telegramPerson.birthday)
    cy.get(byDataTestId(TID.USER_INPUT_STREET_ADDRESS))
      .should('exist')
      .type(telegramPerson.address)
    cy.get(byDataTestId(TID.USER_INPUT_POSTALCODE))
      .should('exist')
      .type(telegramPerson.postal_code)
    cy.get(byDataTestId(TID.USER_INPUT_CITY))
      .should('exist')
      .type(telegramPerson.city)
    cy.get(byDataTestId(TID.USER_INPUT_EMAIL))
      .should('exist')
      .type(telegramPerson.email)
    cy.get(byDataTestId(TID.USER_INPUT_PHONE_NUMBER))
      .should('exist')
      .type(telegramPerson.phone_number)
    cy.get(byDataTestId(TID.USER_INPUT_URBAN_SPORT_NUMBER))
      .should('exist')
      .type(telegramPerson.usc_number)

    cy.get(byDataTestId(TID.USER_FORM_SUBMIT_BUTTON)).should('exist').click()

    cy.url().should('not.include', '/user/new')
    cy.url().should('not.include', '/user/edit')

    cy.getLocalStorage('user').then((user) =>
      expect(user).deep.equal(telegramPerson)
    )

    cy.get(byDataTestId(NB_TID.NAVBAR_USER_MENU_BUTTON))
  })

  it('redirects the user to the given redirect_to', () => {
    cy.visit(
      `/user/new?redirect_to=https://google.com&telegram_id=${telegramPerson.telegram_id}`
    )

    cy.get(byDataTestId(TID.USER_INPUT_FIRST_NAME))
      .should('exist')
      .type(telegramPerson.name)
    cy.get(byDataTestId(TID.USER_INPUT_LAST_NAME))
      .should('exist')
      .type(telegramPerson.last_name)
    cy.get(byDataTestId(TID.USER_INPUT_BIRTHDAY))
      .should('exist')
      .type(telegramPerson.birthday)
    cy.get(byDataTestId(TID.USER_INPUT_STREET_ADDRESS))
      .should('exist')
      .type(telegramPerson.address)
    cy.get(byDataTestId(TID.USER_INPUT_POSTALCODE))
      .should('exist')
      .type(telegramPerson.postal_code)
    cy.get(byDataTestId(TID.USER_INPUT_CITY))
      .should('exist')
      .type(telegramPerson.city)
    cy.get(byDataTestId(TID.USER_INPUT_EMAIL))
      .should('exist')
      .type(telegramPerson.email)
    cy.get(byDataTestId(TID.USER_INPUT_PHONE_NUMBER))
      .should('exist')
      .type(telegramPerson.phone_number)
    cy.get(byDataTestId(TID.USER_INPUT_URBAN_SPORT_NUMBER))
      .should('exist')
      .type(telegramPerson.usc_number)

    cy.get(byDataTestId(TID.USER_FORM_SUBMIT_BUTTON)).should('exist').click()

    cy.url().should('include', 'google.com')
  })

  it('allows edit user data', () => {
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

    cy.url().should('not.include', '/user/new')
    cy.url().should('not.include', '/user/edit')

    cy.getLocalStorage('user').then(async (user) => {
      await expect(user.name).equal('John NewName')
    })
  })
})
