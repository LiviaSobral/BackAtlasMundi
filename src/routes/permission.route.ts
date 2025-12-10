import { Router } from 'express'
import { PermissionController } from '../controllers/PermissionController'
import { authMiddleware } from '../middlewares/AuthMiddleware'
import { modifyMiddleware } from '../middlewares/ModifyMiddleware'

const router = Router()
const controller = new PermissionController()

router.get('/', controller.verifyResponse.bind(controller))

export default router