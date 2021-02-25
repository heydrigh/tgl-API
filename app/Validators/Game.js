'use strict'

class Game {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      'game_array.*.type_id': 'required',
      'game_array.*.numbers': 'required'
    }
  }
}

module.exports = Game
