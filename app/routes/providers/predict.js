'use strict'

const rescue = require('express-rescue')
const { HttpError, validate } = require('@mantris/appify')

const factory = (service) => ([
  /**
   * Request handler
   * ===============
   */
  rescue(async (req, res) => {
    const data = await service.predict(req.query.cnpj, req.query.prediction)

    res.status(201)
       .json(data)
  })
])

module.exports = { factory }
