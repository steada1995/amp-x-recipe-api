const Joi = require('joi')
const validator = require('express-joi-validation')({})

exports.validate_recipe_input = validator.query({
  name: Joi.string()
})
