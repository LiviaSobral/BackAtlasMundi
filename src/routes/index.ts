import { Router } from 'express'
import authRoutes from './auth.routes'
import userRoutes from './user.routes'
import countryRoutes from './country.routes'
import commentRoutes from './comment.routes'
import permissionRoutes from './permission.route'

const router = Router()

router.use('/permission', permissionRoutes)
router.use('/auth', authRoutes)
router.use('/users', userRoutes)
router.use('/country',countryRoutes)
router.use('/comment',commentRoutes)

export default router