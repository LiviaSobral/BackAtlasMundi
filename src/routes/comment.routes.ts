import { Router } from 'express'
import { authMiddleware } from '../middlewares/AuthMiddleware'
import { validateDTO } from '../middlewares/ValidateDTO'
import { CommentController } from '../controllers/CommentController'
import { CreateCommentDTO } from '../dtos/CreateCommentDTO'
import { UpdateCommentDTO } from '../dtos/UpdateCommentDTO'

const router = Router()
const controller = new CommentController()

router.post('/me', authMiddleware, validateDTO(CreateCommentDTO), controller.create.bind(controller))
router.get('/country', controller.findByCountry.bind(controller))
router.get('/user', controller.findByUser.bind(controller))
router.get('/id', controller.findById.bind(controller))
router.put('/me', authMiddleware, validateDTO(UpdateCommentDTO), controller.update.bind(controller))
router.delete('/me', authMiddleware, controller.remove.bind(controller))

export default router