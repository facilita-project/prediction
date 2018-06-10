'use strict'

const mongoose = require('mongoose')
const merge = require('lodash.merge')

/**
 * Models
 * ======
 */
const RevenuesModel = require('./models/revenues')

/**
 * Repositories
 * ============
 */
const RevenuesRepository = require('./repositories/revenues')


/**
 * Constants
 * =========
 */
const DEFAULT_OPTIONS = {
  poolSize: 10,
  keepAlive: 120,
  reconnectTries: 30,
  bufferMaxEntries: 0,
  bufferCommands: false,
  reconnectInterval: 500,
  promiseLibrary: Promise
}

/**
 * Initiates everything related to database usage such as connection, models and
 * repositories.
 * @param  {String} config.url     MongoDB connection string.
 * @param  {Object} config.options MongoDB Client options.
 * @return {Object}                Object containing instantiated repositories.
 */
const factory = (config) => {
  const { url, options } = merge({ options: DEFAULT_OPTIONS }, config)

  const connection = mongoose.createConnection(url, options)

  const models = {
    Revenues: RevenuesModel.factory(connection)
  }

  const repositories = {
    Revenues: new RevenuesRepository(models.Revenues)
  }


  return { repositories }
}

module.exports = { factory }
