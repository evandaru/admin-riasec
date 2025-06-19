// title: app/middleware/guest_middleware.ts
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class GuestMiddleware {
  async handle(ctx: HttpContext, next: NextFn, _options: { guards?: string[] } = {}) {
    await ctx.auth.check()

    if (ctx.auth.isAuthenticated) {
      if (ctx.auth.user?.role === 'admin') {
        return ctx.response.redirect().toRoute('admin.dashboard')
      }
      return ctx.response.redirect().toRoute('dashboard')
    }

    return next()
  }
}
