/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line
require('dotenv').config()

module.exports = (on, config) => {
  // eslint-disable-next-line
  config.env['NEXT_PUBLIC_SOCKET_API_URL'] =
    process.env.NEXT_PUBLIC_SOCKET_API_URL
  // Object.keys(process.env).forEach(envKey => {
  //   config.env[envKey] = process.env[envKey];
  // })
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  return config
}
