// app/middleware/is_user_middleware.ts
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class IsUserMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    /**
     * Cek kalo user yang login BUKAN admin.
     * Kalo dia admin, langsung tendang.
     */
    if (ctx.auth.user?.role === 'admin') {
      return ctx.response.redirect().toRoute('admin.dashboard')
    }

    /**
     * Kalo bukan admin, lanjut ke request berikutnya.
     */
    const output = await next()
    return output
  }
}
