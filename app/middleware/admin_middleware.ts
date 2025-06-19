// title: app/middleware/admin_middleware.ts
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class AdminMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    if (ctx.auth.user?.role !== 'admin') {
      return ctx.response.redirect().back()
    }
    return next()
  }
}
