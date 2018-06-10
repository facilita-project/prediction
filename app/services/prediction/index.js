'use strict'

const regression = require('regression')
class PredictionService {
  /**
   * @param {Object}  storage    Storages instances.
   * @param {Object}  repository Repositories instances.
   */
  constructor (repository) {
    this.$repository = repository
  }

  async predict (cnpj, value) {
    const client = await MongoClient.connect("mongodb://erickwendel:Erick123@ds153980.mlab.com:53980/hackthonciab")
    const collection = client.db('hackthonciab').collection('notas-fiscais')

    const history = await collection.aggregate([{ $match: {'NF.nome': {$regex: cnpj}} }]).toArray()

    const dataset = history.map(item => {
      const date = item.NF.data.split('/')
      return [parseInt(date[1]), parseFloat(item.NF.valor)]
    })

    const model = regression.linear(dataset)
    // sorry, hight level gambiarra here
    const prediction = model.predict(dataset.length)
    const prediction1 = model.predict(dataset.length + 1)
    const prediction2 = model.predict(dataset.length + 2)

    const values = history.map(item => {
      return [item.NF.valor]
    })

    values.push([0])
    values.push([0])
    values.push([0])


    //[prediction[1], prediction[2], prediction[3]]
    const x = []
    for(var i = 0; i<= values.length - 3; i++){
      x.push([0])
    }
    x.push([prediction[1]])
    x.push([prediction1[1]])
    x.push([prediction2[1]])
    

    return {
      datasets: [
        {
          label: 'Original',
          data: values
        },
        {
          label: 'Predicted',
          data: x
        }
      ]
    }
  }
}

module.exports = PredictionService
