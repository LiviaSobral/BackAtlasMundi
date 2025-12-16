import { Router } from 'express'
import { PermissionController } from '../controllers/PermissionController'

const router = Router()
const controller = new PermissionController()

router.get('/approve', controller.approve.bind(controller))
router.get('/deny', controller.deny.bind(controller))

export default router