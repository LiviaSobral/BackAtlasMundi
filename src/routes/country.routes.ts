import { Router } from 'express'
import { authMiddleware } from '../middlewares/AuthMiddleware'
import { CountryController } from '../controllers/CountryController'
import { modifyMiddleware } from '../middlewares/ModifyMiddleware'
import { validateDTO } from '../middlewares/ValidateDTO'
import { CreateCountryDTO } from '../dtos/CreateCountryDTO'
import { UpdateCountryDTO } from '../dtos/UpdateCountryDTO'

const router = Router()
const controller = new CountryController()

router.post('/me', authMiddleware, modifyMiddleware, validateDTO(CreateCountryDTO), controller.create.bind(controller))
router.get('/', controller.getByName.bind(controller))
router.put('/me', authMiddleware, modifyMiddleware, validateDTO(UpdateCountryDTO), controller.update.bind(controller))
router.delete('/me', authMiddleware, modifyMiddleware,controller.remove.bind(controller))

export default router