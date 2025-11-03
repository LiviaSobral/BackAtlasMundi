import { Router } from 'express'
import { UserController } from '../controllers/UserController'
import { authMiddleware } from '../middlewares/AuthMiddleware'
import { validateDTO } from '../middlewares/ValidateDTO'
import { UpdateUserDTO } from '../dtos/UpdateUserDTO'
import { CreateTagUserDTO } from '../dtos/CreateTagUserDTO' 

const router = Router()
const controller = new UserController()

router.get('/me', authMiddleware, controller.getById.bind(controller))
router.put('/me', authMiddleware, validateDTO(UpdateUserDTO), controller.update.bind(controller))
router.delete('/me',authMiddleware,controller.remove.bind(controller))
router.put('/me/tag',authMiddleware,validateDTO(CreateTagUserDTO), controller.SaveTag.bind(controller))
router.put('/me/tag/delete',authMiddleware, controller.DeleteTag.bind(controller))

export default router