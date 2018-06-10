'use strict'

const { Schema } = require('mongoose')

const properties = {
    NF: {
        data: {
          type: String
        },
        CNPJ: {
          type: String
        },
        valor: {
          type: String
        },
        nome: {
          type: String
        },
    },
    path:{
      type: String
    }
}

const options = {
  id: false,
  safe: true,
  strict: true,
  timestamps: false,
  versionKey: false
}

const schema = new Schema(properties, options)

const factory = (connection) => {
  return connection.model('notas-fiscais', schema)
}

module.exports = schema
module.exports.factory = factory
