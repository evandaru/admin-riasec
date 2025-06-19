// title: app/policies/note_policy.ts
import User from '#models/user'
import Note from '#models/note'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class NotePolicy extends BasePolicy {
  view(user: User, note: Note): AuthorizerResponse {
    return user.id === note.userId
  }

  update(user: User, note: Note): AuthorizerResponse {
    return user.id === note.userId
  }

  delete(user: User, note: Note): AuthorizerResponse {
    return user.id === note.userId
  }
}
