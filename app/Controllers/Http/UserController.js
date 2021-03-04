'use strict'

const User = use('App/Models/User')
const Database = use('Database')

class UserController {
  async store ({ request }) {
    const data = request.only(['username', 'email', 'password'])

    const trx = await Database.beginTransaction()

    const user = await User.create(data, trx)

    await trx.commit()

    return user
  }

  async update ({ request, response, params, auth }) {
    const data = request.only(['username', 'password'])
    const user = auth.user

    console.log(data)

    if (data.username) {
      user.username = data.username
    }

    if (data.password) {
      user.password = data.password
    }

    await user.save()
    return user
  }
}

module.exports = UserController
