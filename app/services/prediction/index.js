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
    const history = await this.$repository.findByCNPJ(cnpj)

    const dataset = history.map(item => {
      const date = item.NF.data.split('/')
      return [parseInt(date[1]), parseFloat(item.NF.valor)]
    })

    console.log(dataset)
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
