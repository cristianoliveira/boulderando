import { byDataTestId } from '../support/data-testid'

import * as BL_TID from '../../src/components/BookingHistory/BookingList'

import person from '../fixtures/persons/valid.json'
import bookingHistory from '../fixtures/booking-history.json'

describe('Booking history', () => {
  before(() => {
    cy.viewport('iphone-7')
    cy.setLocalStorage('user', person)
    cy.setLocalStorage('booking-history', bookingHistory)

    cy.visit('/booking-history')
  })

  after(() => {
    cy.removeLocalStorage('user')
    cy.removeLocalStorage('booking-history')
    cy.localStorage((ls) => {
      expect(ls.getItem('user')).equal(null)
      expect(ls.getItem('booking-history')).equal(null)
    })
  })

  it('shows booking session from the newsest to oldest', () => {
    cy.get(byDataTestId(BL_TID.BOOKING_HISTORY_LIST_ITEM))
      .first()
      .should('contain', 'basement')
      .should('contain', 'saturday-26/03/2022')

    cy.get(byDataTestId(BL_TID.BOOKING_HISTORY_LIST_ITEM))
      .last()
      .should('contain', 'boulderklub')
      .should('contain', 'tuesday-24/02/2022')
  })

  it('allows deleting booking history', () => {
    cy.get(byDataTestId(BL_TID.BOOKING_HISTORY_LIST_ITEM))
      .first()
      .find(byDataTestId(BL_TID.BOOKING_HISTORY_DELETE_BTN)).click()

    cy.get(byDataTestId(BL_TID.BOOKING_HISTORY_LIST_ITEM))
      .first()
      .should('not.contain', 'basement')
      .should('not.contain', 'saturday-26/03/2022')
  })
})
