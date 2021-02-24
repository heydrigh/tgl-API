'use strict'

class Game {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      numbers: 'required|string',
      type_id: 'required|number'
    }
  }
}

module.exports = Game
