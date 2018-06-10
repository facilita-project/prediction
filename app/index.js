'use strict'

const routes = require('./routes')
const database = require('./database')
const appify = require('@mantris/appify')
const PredictionService = require('./services/prediction')

/**
 * Application setup.
 * @param  {Object} api                 Express instance.
 * @param  {Object} options.config      Application configs.
 */
module.exports = appify((api, config) => {
  const { repositories } = database.factory(config.mongodb)

  const predictionService = new PredictionService(repositories.Revenues)

  api.get('/', routes.prediction.predict.factory(predictionService))
})
