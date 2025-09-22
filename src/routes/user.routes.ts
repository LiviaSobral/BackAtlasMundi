import { Router } from 'express'
import { UserController } from '../controllers/UserController'
import { authMiddleware } from '../middlewares/AuthMiddleware'
import { validateDTO } from '../middlewares/ValidateDTO'
import { UpdateUserDTO } from '../dtos/UpdateUserDTO'

const router = Router()
const controller = new UserController()

router.get('/me', authMiddleware, controller.getById.bind(controller))
router.put('/me', authMiddleware, validateDTO(UpdateUserDTO), controller.update.bind(controller))
router.delete('/me',authMiddleware,controller.remove.bind(controller))
router.put('/me/tag',authMiddleware, controller.SaveTag.bind(controller))

export default router