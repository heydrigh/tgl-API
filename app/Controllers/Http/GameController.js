/* eslint-disable camelcase */
'use strict'

const Game = use('App/Models/Game')
const Type = use('App/Models/Type')
const Mail = use('Mail')

class GameController {
  async index ({ auth }) {
    const user_id = auth.user.id

    const games = await Game.query().where({ user_id }).with('user').with('type').fetch()
    return games
  }

  async store ({ request, response, auth }) {
    const data = request.only(['game_array'])
    const user = auth.user
    const games = (data.game_array)
    let details = {}
    let totalprice = 0

    const gameMap = games.map(async game => {
      const type = await Type.findOrFail(game.type_id)
      game.user_id = auth.user.id

      game.price = type.price

      game.name = type.type

      totalprice = totalprice + game.price

      details = { ...details, game }

      const gamedone = await Game.create(game)

      return gamedone
    })
    const fullDetails = await Promise.all(gameMap)

    const totalCart = totalprice

    await Mail.send(
      ['emails.new_game'],
      { username: user.username, fullDetails, totalCart },
      message => {
        message
          .to(user.email)
          .from('heydrigh@mail.com', 'Heydrigh')
          .subject('Novo jogo')
      }
    )
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
