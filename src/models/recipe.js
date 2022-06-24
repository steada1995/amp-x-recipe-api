const { Model } = require('objection')

const config = require('config')
const knex = require('knex')(config.db)

Model.knex(knex)

class Recipe extends Model {
  static get tableName () {
    return 'recipes'
  }

  static get idColumn () {
    return 'id'
  }
}

module.exports = Recipe
