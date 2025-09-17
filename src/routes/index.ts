import { Router } from 'express'
import authRoutes from './auth.routes'
import userRoutes from './user.routes'
//import countryRoutes
//import commentRoutes

const router = Router()

router.use('/auth', authRoutes)
router.use('/users', userRoutes)
//router.user('/country',countryRoutes)
//router.use('/comment',commentRoutes)

export default router