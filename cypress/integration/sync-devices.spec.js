import io from 'socket.io-client'
import { byDataTestId } from '../support/data-testid'

import * as NB_TID from '../../src/components/NavigationBar/data-testid'
import person from '../fixtures/persons/valid.json'
import bookingHistory from '../fixtures/booking-history.json'
import sessions from '../fixtures/sessions.json'

import {
  PUSH_TO_REMOTE,
  EVENT_DEVICE_CONNECTED,
} from '../../src/constants/socket-channels'
import {
  SYNC_DEVICE_CODE,
  SYNC_DEVICE_URL,
} from '../../pages/sync/devices.page'

// eslint-disable-next-line
describe('Synching data between devices', () => {
  beforeEach(() => {
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
    cy.visit('/')
    cy.get(byDataTestId(NB_TID.NAVBAR_NAVIGATION_MENU_BUTTON))
      .should('be.visible')
      .click()

    cy.get(byDataTestId(NB_TID.NAVBAR_USER_MENU_ITEM_SYNC_DEVICE))
      .should('be.visible')
      .click()
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
        await w.fetch(
          `${Cypress.env(
            'NEXT_PUBLIC_SOCKET_API_URL'
          )}/sync-devices?code=${deviceId}`
        )
        return io.connect(`${Cypress.env('NEXT_PUBLIC_SOCKET_API_URL')}`)
      })
      .as('socket')

    cy.get('@socket').should('not.be.undefined')
    cy.get('@socket').then((s) =>
      s.emit(PUSH_TO_REMOTE(deviceId), {
        type: EVENT_DEVICE_CONNECTED,
        code: 'device-id',
      })
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
