'use strict'

class EditUser {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      username: 'required|unique:users',
      password: 'required|confirmed'
    }
  }
}

module.exports = EditUser
