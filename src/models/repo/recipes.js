const { omit } = require('ramda')
const config = require('config')
const knex = require('knex')(config.db)
const Recipe = require('../recipe')

module.exports = {
  list: (params) => {
    let query = Recipe.query()

    query
      .page(params.page - 1, params.limit)
      .orderBy(params.orderBy, params.order)
      .where(omit(['limit', 'offset', 'orderBy', 'page', 'order'], params))

    return query
  },
  create: (body) => {
    return Recipe.query().insert(body)
      .then((recipe) => Recipe.query().where({ id: recipe.id }).first())
  },
  update: (id, body) => {
    return Recipe
      .query()
      .where({ id })
      .patch(body)
      .then((recipe) => Recipe.query().where({ id }).first())
  },
}
