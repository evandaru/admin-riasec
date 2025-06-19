// title: database/seeders/note_seeder.ts
import Note from '#models/note'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { faker } from '@faker-js/faker'

export default class extends BaseSeeder {
  async run() {
    const users = await User.all()

    for (const user of users) {
      await Note.createMany([
        {
          userId: user.id,
          title: faker.lorem.sentence(),
          content: faker.lorem.paragraphs(2),
        },
        {
          userId: user.id,
          title: faker.lorem.sentence(),
          content: faker.lorem.paragraphs(3),
        },
      ])
    }
  }
}
