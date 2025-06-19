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

const SiswaRiasecsController = () => import('#controllers/admin/riasec/siswa_riasecs_controller')

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
  })
  .use([middleware.auth(), middleware.isUser()])

router
  .group(() => {
    router.get('/dashboard', [AdminDashboardController, 'index']).as('admin.dashboard')
    router.resource('users', AdminUsersController).as('admin.users')

    router.get('/siswa-riasec', [SiswaRiasecsController, 'index']).as('admin.siswaRiasec.index')
  })
  .prefix('admin')
  .use([middleware.auth(), middleware.admin()])
