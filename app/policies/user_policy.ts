// title: app/policies/user_policy.ts
import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class UserPolicy extends BasePolicy {
  delete(admin: User, userToDelete: User): AuthorizerResponse {
    return admin.id !== userToDelete.id
  }
}
