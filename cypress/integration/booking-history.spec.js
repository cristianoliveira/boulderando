import { byDataTestId } from '../support/data-testid'

import * as BL_TID from '../../src/components/BookingHistory/BookingList'

import person from '../fixtures/persons/valid.json'
import bookingHistory from '../fixtures/booking-history.json'

describe('Booking history', () => {
  beforeEach(() => {
    cy.viewport('iphone-7')
    cy.setLocalStorage('user', person)
    cy.setLocalStorage('booking-history', bookingHistory)

    cy.visit('/booking-history')
  })

  afterEach(() => {
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
      .then(e => {
        expect(e.text()).include('basement')
        expect(e.text()).include('26/03/2022')
      })
    cy.get(byDataTestId(BL_TID.BOOKING_HISTORY_LIST_ITEM))
      .last()
      .then(e => {
        expect(e.text()).include('boulderklub')
        expect(e.text()).include('24/02/2022')
      })
  })
})
