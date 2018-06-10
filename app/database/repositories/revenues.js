'use strict'

const {
  MongoClient,
  ObjectId
} = require('mongodb')

class RevenuesRepository {
  /**
   * @param {Object} model Provider model.
   */
  constructor (model) {
    this.$model = model 
  }

 /**
 * Find a provider or unit attendance by one of his/hers id.
 * @param  {String} id provider id.
 */
  async findByCNPJ (cnpj) {
    const client = await MongoClient.connect("mongodb://erickwendel:Erick123@ds153980.mlab.com:53980/hackthonciab")
      const collection = client.db('hackthonciab').collection('notas-fiscais')
      return collection.aggregate([{ $match: {'NF.nome': {$regex: cnpj}} }]).toArray()
    // return this.$model.find({ 'NF.CNPJ': cnpj })
    //                   .lean()
  }
}

module.exports = RevenuesRepository
