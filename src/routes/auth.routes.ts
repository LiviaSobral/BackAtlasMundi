import { Router } from 'express'
import { AuthController } from '../controllers/AuthController'
import { validateDTO } from '../middlewares/ValidateDTO'
import { CreateUserDTO } from '../dtos/CreateUserDTO'
import { LoginUserDTO } from '../dtos/LoginUserDTO'

const router = Router()
const controller = new AuthController()

/*
    Exemplo create User, essas variaveis devem ser usadas:

    name:string;
    
    email:string;
    
    password:string;

    cpf?:string (cpf é opcional mas se adicionado modifica automaticamente o boolean teacher, a requisição NÃO manda o boolean teacher em si)

*/

router.post('/register', validateDTO(CreateUserDTO),controller.register.bind(controller)) // /auth/register, o body precisa de um nome com apenas letras, um email que seja valido, uma senha com no minimo 6 characteres e é opcional a adição de um cpf. Se um cpf for adicionado automaticamente o boolean profesor se torna true.
router.post('/login', validateDTO(LoginUserDTO),controller.login.bind(controller))

export default router