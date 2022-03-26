import io from 'socket.io-client'
import { byDataTestId } from '../support/data-testid'

import person from '../fixtures/persons/valid.json'
import bookingHistory from '../fixtures/booking-history.json'
import sessions from '../fixtures/sessions.json'

import { PUSH_TO_REMOTE } from '../../src/constants/socket-channels'
import { SYNC_DEVICE_CODE, SYNC_DEVICE_URL } from '../../pages/sync/devices'

describe('Synching data between devices', () => {
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

  it('pulls the localstorage of the connected remote device', () => {
    let deviceId
    const localStorageRemoteDevice = {
      sessions,
      user: person,
      'booking-history': bookingHistory,
    }

    cy.get(byDataTestId(SYNC_DEVICE_CODE))
      .invoke('text')
      .then((value) => {
        deviceId = value
      })

    cy.window()
      .then(async (w) => {
        await w.fetch(`/api/sync-devices?code=${deviceId}`)
        return io()
      })
      .as('socket')

    cy.get('@socket').should('not.be.undefined')
    cy.get('@socket').then((s) =>
      s.emit(PUSH_TO_REMOTE(deviceId), { type: 'init', code: 'device-id' })
    )

    cy.get(byDataTestId(SYNC_DEVICE_URL)).should('be.visible')
    cy.contains(`Connected with`).should('be.visible')

    cy.get('@socket').then((s) => {
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
