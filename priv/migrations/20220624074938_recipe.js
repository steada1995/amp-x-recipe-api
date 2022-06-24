
exports.up = (knex, Promise) => {
    return knex.schema.createTable('recipes', (t) => {
      t.charset('utf8')
      t.collate('utf8_general_ci')
      t.increments('id').unsigned().primary()
      t.string('name').notNull()
      t.json('ingredients').notNull()
      t.specificType('image', 'mediumblob').nullable()
    })
  } 
  
  exports.down = function (knex, Promise) {
  }
  