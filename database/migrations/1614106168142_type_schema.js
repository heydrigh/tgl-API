'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TypeSchema extends Schema {
  up () {
    this.create('types', (table) => {
      table.increments()
      table.string('type').notNullable()
      table.string('description').notNullable()
      table.integer('range').notNullable()
      table.float('price').notNullable()
      table.integer('max_number').notNullable()
      table.string('color').notNullable()
      table.float('min_cart_value').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('types')
  }
}

module.exports = TypeSchema
