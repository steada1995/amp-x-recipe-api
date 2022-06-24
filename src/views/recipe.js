const {map, pick} = require('ramda')

const fields = ['id', 'name', 'ingredients', 'image']

module.exports = {
  one: pick(fields),
  many: map(pick(fields)),
}
