/* eslint-disable camelcase */
'use strict'

const Game = use('App/Models/Game')
const Type = use('App/Models/Type')

class GameController {
  async index ({ params, request, response, view }) {
    const { user_id } = request.get()
    if (user_id) {
      const games = await Game.query().where({ user_id }).with('user').with('type').fetch()
      return games
    }
    const games = await Game.query().with('user').with('type').fetch()
    return games
  }

  async store ({ request, response, auth }) {
    const data = request.only(['type_id', 'numbers'])
    console.log(data)

    const type = await Type.find(data.type_id)
    if (!type) {
      throw new Error('Type does not exist', 404)
    }
    data.user_id = auth.user.id
    data.price = type.price

    const game = await Game.create(data)
    return game
  }

  async show ({ params, request, response, view }) {
    const game = await Game.findOrFail(params.id)

    await game.load('user')
    await game.load('type')

    return game
  }

  async update ({ params, request, response }) {
    const data = request.only(['type_id', 'numbers'])
    const game = await Game.findOrFail(params.id)

    const type = await Type.findOrFail(data.type_id)

    data.price = type.price

    await game.merge(data)
    await game.save()
    return game
  }

  async destroy ({ params, request, response }) {
    const game = await Game.findOrFail(params.id)

    await game.delete()
  }
}

module.exports = GameController
