// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('setLocalStorage', (key, data) => {
  cy.window().then((w) => {
    w.localStorage.setItem(key, JSON.stringify(data))
    expect(JSON.parse(w.localStorage.getItem(key))).include(data)
  })
 });

Cypress.Commands.add('getLocalStorage', (key) => {
  return cy.window().then((w) => {
    return JSON.parse(w.localStorage.getItem(key))
  })
 });

Cypress.Commands.add('removeLocalStorage', (key) => {
  cy.window().then((w) => {
    w.localStorage.removeItem('user')
    expect(w.localStorage.getItem('user')).equal(null)
  })
 });

Cypress.Commands.add('localStorage', () => {
  cy.window().then((w) => {
    return w.localStorage
  })
 });
