const { compose, bind, tap, prop, map, evolve, identity } = require('ramda')
const repo = require('../models/repo/recipes')
const input = require('../input-filters/recipe')
const error = require('../views/error')
const view = require('../views/recipe')
const { form_data_parser_create, form_data_parser_patch } = require("../middleware/file_parser")
const {create_filters, append_headers} = require('../utilities/pagination')

const list = (req, res) => {
  let params = Object.assign({},
    {
      page: 1,
      limit: 25,
      orderBy: 'id',
      order: 'ASC',
    },
    req.query
  )

  repo
    .list(params)
    .then(create_filters(params))
    .then(tap(append_headers(res)))
    .then(prop('results'))
    .then(compose(bind(res.json, res), view.many))
    .catch(error.generic(res))
}

const create = (req, res) => {
  repo
    .create(req.body)
    .then(compose(bind(res.status(201).json, res), view.one))
    .catch(error.generic(res))
}

const patch = (req, res) => {
  repo
    .update(req.params.id, req.body)
    .then(compose(bind(res.json, res), view.one))
    .catch(error.generic(res))
}

let recipe = require('express').Router()

recipe.get('/',
  input.validate_recipe_input,
  list
)

recipe.post('/',
  form_data_parser_create,
  create
)

recipe.patch('/:id',
  form_data_parser_patch,
  patch
)



module.exports = recipe
