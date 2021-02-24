'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Type = use('App/Models/Type')

/**
 * Resourceful controller for interacting with types
 */
class TypeController {
  async index ({ request, response, view }) {
    const types = await Type.all()
    return types
  }

  async store ({ request, response, auth }) {
    const data = request.only([
      'type',
      'description',
      'range',
      'price',
      'max_number',
      'color',
      'min_cart_value'
    ])

    const type = await Type.create(data)

    return type
  }

  async show ({ params }) {
    const type = await Type.findOrFail(params.id)

    return type
  }

  async update ({ params, request }) {
    const type = await Type.findOrFail(params.id)

    const data = request.only([
      'type',
      'description',
      'range',
      'price',
      'max_number',
      'color',
      'min_cart_value'
    ])

    type.merge(data)

    await type.save()

    return type
  }

  async destroy ({ params, request, response }) {
    const type = await Type.findOrFail(params.id)

    await type.delete()
  }
}

module.exports = TypeController
