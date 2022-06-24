const multiparty = require('multiparty')
const { path } = require("ramda")
const fs = require('fs')

const form_data_parser_create = (req, res, next) => {
  const form = new multiparty.Form()
  form.parse(req, (error, fields, files) => {
    if (error) {
      return res.status(400).json({
        error,
        message: error.message,
      })
    }
    const name = path(["name", "0"], fields)
    const ingredients = path(["ingredients", "0"], fields)
    const image = path(["image", "0"], files)
    
    if(!name) {
      return res.status(400).json({ status: 400, message: "Name is required" })
    } else {
      req.body.name = name
    }

    if(!ingredients) {
      return res.status(400).json({ status: 400, message: "Ingredients is required" })
    } else {
      req.body.ingredients = ingredients
    }

    if(image) {
      console.log("djkdkdkd")
      req.body.image = fs.readFileSync(files.image[0].path, "binary").toString("binary")
    }

    next()
  })
}

const form_data_parser_patch = (req, res, next) => {
  const form = new multiparty.Form()
  form.parse(req, (error, fields, files) => {
    if (error) {
      return res.status(400).json({
        error,
        message: error.message,
      })
    }
    const ingredients = path(["ingredients", "0"], fields)

    if(ingredients) {
      req.body.ingredients = ingredients
    }

    next()
  })
}


module.exports = {
  form_data_parser_create,
  form_data_parser_patch
}