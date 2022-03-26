import io from 'socket.io-client'
import { byDataTestId } from '../support/data-testid'

import person from '../fixtures/persons/valid.json'
import bookingHistory from '../fixtures/booking-history.json'
import sessions from '../fixtures/sessions.json'

import { PUSH_TO_REMOTE } from '../../src/constants/socket-channels'

describe('Bouldering Session Selection', () => {
  beforeEach(() => {
    cy.visit('/sync/devices')
    cy.viewport('iphone-7')
    cy.localStorage((ls) => {
      expect(ls.getItem('user')).equal(null)
      expect(ls.getItem('sessions')).equal(null)
      expect(ls.getItem('booking-history')).equal(null)
    })
  })

  afterEach(() => {
    cy.removeLocalStorage('user')
    cy.removeLocalStorage('sessions')
    cy.removeLocalStorage('booking-history')
    cy.localStorage((ls) => {
      expect(ls.getItem('user')).equal(null)
      expect(ls.getItem('sessions')).equal(null)
      expect(ls.getItem('booking-history')).equal(null)
    })
  })

  it('sync the localstorage of the connected device', () => {
    const deviceId = 'device-id'
    const localStorageRemoteDevice = {
      sessions,
      user: person,
      'booking-history': bookingHistory,
    }

    cy.window().then(async (w) => {
      await w.fetch(`/api/sync-devices?code=${deviceId}`)
      // eslint-disable-next-line
      w.socket = io()
    })

    cy.window().its('socket').should('not.be.undefined')
    cy.window()
      .its('socket')
      .then((s) => {
        s.emit(PUSH_TO_REMOTE(deviceId), { type: 'init', code: 'device-id' })
      })

    cy.get(byDataTestId('device-link')).should('be.visible')
    cy.contains('Connected with device-id')

    cy.window()
      .its('socket')
      .then((s) => {
        s.emit(PUSH_TO_REMOTE(deviceId), {
          type: 'sync-data',
          code: deviceId,
          sync: localStorageRemoteDevice,
        })
      })

    cy.url().should('contains', '/sessions', { timeout: 10000 })

    cy.getLocalStorage('user').then(async (u) => {
      await expect(u).to.deep.equal(localStorageRemoteDevice.user)
    })
    cy.getLocalStorage('sessions').then(async (s) => {
      await expect(s).to.deep.equal(localStorageRemoteDevice.sessions)
    })
    cy.getLocalStorage('booking-history').then(async (bh) => {
      await expect(bh).to.deep.equal(
        localStorageRemoteDevice['booking-history']
      )
    })
  })
})
