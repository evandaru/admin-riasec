// title: start/routes.ts
import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const SessionController = () => import('#controllers/session_controller')
const HomeController = () => import('#controllers/homepages_controller')
const RegisterController = () => import('#controllers/auth/registers_controller')

const UserDashboardController = () => import('#controllers/user/dashboard_controller')
const NotesController = () => import('#controllers/user/notes_controller')
const TestsController = () => import('#controllers/user/tests_controller')

const AdminDashboardController = () => import('#controllers/admin/dashboard_controller')
const AdminUsersController = () => import('#controllers/admin/users_controller')

const ProfilesController = () => import('#controllers/admin/profiles_controller')

const SiswaRiasecsController = () => import('#controllers/admin/riasec/siswa_riasecs_controller')
const PertanyaanRiasecsController = () =>
  import('#controllers/admin/riasec/pertanyaan_riasecs_controller')

const RecommendationsController = () => import('#controllers/user/recommendations_controller')

const UserProfilesController = () => import('#controllers/user/profiles_controller')

router.get('/', [HomeController, 'index']).as('home')

router
  .group(() => {
    router.get('/login', [SessionController, 'create']).as('auth.login')
    router.post('/login', [SessionController, 'store']).as('auth.store')
    router.get('/register', [RegisterController, 'create']).as('auth.register')
    router.post('/register', [RegisterController, 'store']).as('auth.register.store')
  })
  .use(middleware.guest())

router.post('/logout', [SessionController, 'destroy']).as('auth.logout')

router
  .group(() => {
    router.get('/dashboard', [UserDashboardController, 'index']).as('dashboard')
    router.resource('notes', NotesController).except(['show'])

    router.get('/riasec', [TestsController, 'index']).as('riasec.index')
    router.get('/riasec/test', [TestsController, 'start']).as('riasec.start')
    router.post('/riasec/submit', [TestsController, 'store']).as('riasec.store')
    router.get('/riasec/result', [TestsController, 'showMyResult']).as('riasec.result')

    router.get('/recommendations', [RecommendationsController, 'index']).as('recommendations.index')

    router.get('/profile', [UserProfilesController, 'show']).as('user.profile.show')
    router.put('/profile', [UserProfilesController, 'update']).as('user.profile.update')
  })
  .use([middleware.auth(), middleware.isUser()])

// ╭─────────────────────────────────╮
// │                                 │
// │    🔥 iki admin kang            │
// │                                 │
// ╰─────────────────────────────────╯

router
  .group(() => {
    router.get('/dashboard', [AdminDashboardController, 'index']).as('admin.dashboard')
    router.resource('users', AdminUsersController).as('admin.users')

    router.get('/siswa-riasec/create', [SiswaRiasecsController, 'create']).as('admin.siswa.create')
    router.post('/siswa-riasec', [SiswaRiasecsController, 'store']).as('admin.siswa.store')

    router.get('/siswa-riasec/:id/edit', [SiswaRiasecsController, 'edit']).as('admin.siswa.edit')

    router.put('/siswa-riasec/:id', [SiswaRiasecsController, 'update']).as('admin.siswa.update')

    router.get('/siswa-riasec', [SiswaRiasecsController, 'index']).as('admin.siswaRiasec.index')
    router.get('/siswa-riasec/:id', [SiswaRiasecsController, 'show']).as('admin.siswaRiasec.show')
    router
      .delete('/siswa-riasec/:id', [SiswaRiasecsController, 'destroy'])
      .as('admin.siswaRiasec.destroy')

    router
      .post('/siswa-riasec/:id/reset', [SiswaRiasecsController, 'resetTest'])
      .as('admin.siswaRiasec.reset')

    router.get('/pertanyaan', [PertanyaanRiasecsController, 'index']).as('admin.pertanyaan.index')

    router
      .get('/pertanyaan/create', [PertanyaanRiasecsController, 'create'])
      .as('admin.pertanyaan.create')
    router.post('/pertanyaan', [PertanyaanRiasecsController, 'store']).as('admin.pertanyaan.store')

    router
      .get('/pertanyaan/:id/edit', [PertanyaanRiasecsController, 'edit'])
      .as('admin.pertanyaan.edit')
    router
      .put('/pertanyaan/:id', [PertanyaanRiasecsController, 'update'])
      .as('admin.pertanyaan.update')

    router
      .delete('/pertanyaan/:id', [PertanyaanRiasecsController, 'destroy'])
      .as('admin.pertanyaan.destroy')

    router.get('/profile', [ProfilesController, 'show']).as('admin.profile.show')
    router.put('/profile', [ProfilesController, 'update']).as('admin.profile.update')
  })
  .prefix('admin')
  .use([middleware.auth(), middleware.admin()])
