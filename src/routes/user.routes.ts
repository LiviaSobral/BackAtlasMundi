import { Router } from 'express'
import { UserController } from '../controllers/UserController'
import { authMiddleware } from '../middlewares/AuthMiddleware'
import { validateDTO } from '../middlewares/ValidateDTO'
import { UpdateUserDTO } from '../dtos/UpdateUserDTO'
import { CreateTagUserDTO } from '../dtos/CreateTagUserDTO' 

const router = Router()
const controller = new UserController()

/*
    Exemplo update User, essas variaveis podem ser usadas:

    name?:string;
    
    email?:string;
    
    password?:string;

    cpf?:string

    (todos são opcionais ja que é um update)
*/

router.get('/me', authMiddleware, controller.getById.bind(controller)) // busca usuario po id
router.put('/me', authMiddleware, validateDTO(UpdateUserDTO), controller.update.bind(controller)) // atualiza o usuario, recebendo todas as informações de quando o usuario foi criado(mesmo o cpf, um usuario q n é professor pode se tornar se adicionar um cpf)
router.delete('/me',authMiddleware,controller.remove.bind(controller)) //deleta usuario, não precisa de body pois ja pega id to token
router.put('/me/tag',authMiddleware,validateDTO(CreateTagUserDTO), controller.SaveTag.bind(controller)) // PUT /users/me/tag cria uma tag em um pais para o usuario poder buscar depois(como um marcador de pagina), so precisa do id do pais
router.put('/me/tag/delete',authMiddleware, controller.DeleteTag.bind(controller)) // PUT /users/me/tag/delete deleta a tag criada
export default router