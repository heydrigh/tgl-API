'use strict'

const Route = use('Route')

Route.post('users', 'UserController.store').validator('User')
Route.post('sessions', 'SessionController.store').validator('Session')

Route.post('passwords', 'ForgotPasswordController.store').validator(
  'ForgotPassword'
)
Route.put('passwords', 'ForgotPasswordController.update').validator(
  'ResetPassword'
)

Route.group(() => {
  Route.resource('types', 'TypeController')
    .apiOnly()
    .validator(
      new Map([
        [['types.store'], ['Type']],
        [['types.update'], ['Type']]
      ])
    )

  Route.put('users', 'UserController.update').validator('EditUser')
  Route.resource('games', 'GameController')
    .apiOnly()
    .validator(new Map([[['games.store'], ['Game']]]))
}).middleware(['auth'])
