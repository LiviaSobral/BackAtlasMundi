import { Router } from 'express'
import { authMiddleware } from '../middlewares/AuthMiddleware'
import { CountryController } from '../controllers/CountryController'
import { modifyMiddleware } from '../middlewares/ModifyMiddleware'
import { validateDTO } from '../middlewares/ValidateDTO'
import { CreateCountryDTO } from '../dtos/CreateCountryDTO'
import { UpdateCountryDTO } from '../dtos/UpdateCountryDTO'

const router = Router()
const controller = new CountryController()
/*
    tudo em Country, quando criando precisa dessas variaveis:

    name:string;

    quickInfo:string

    url?:string (Opcional para adicionar imagens)

    politics:string

    politics2:string

    history:string

    history2:string

    culture:string

    culture2:string

    inEnglish:boolean

    sources:string
}

*/

//todas as buscas de pais aqui se baseam em nome e o boolean de ingles para facilitar na hora de buscar no front, ja que pode ser em ingles ou portugues.
router.post('/me', authMiddleware, modifyMiddleware, validateDTO(CreateCountryDTO), controller.create.bind(controller)) // post de pais para criar um pais, so entra nessa rota se passar pelo modifyMiddleware que verifica se o usuario fazendo a requisição é um professor. O body precisa de todas as informações necessarias para criar um pais (nome{apenas com letras}, informações rapidas, url{opcional para imagens}, politics e politics2{separados para facilitar o front},history e history2, culture e culture2, inEnglish{boolean pra saber se esta em ingles}, sources{a fonte das informações} )
router.get('/', controller.getByName.bind(controller)) // get do pais, precisa de nome e o boolean de ingles {obrigatorio ter os dois ja que um nome pode ser igual em ingles e portugues}
router.put('/me', authMiddleware, modifyMiddleware, validateDTO(UpdateCountryDTO), controller.update.bind(controller)) // Update do pais, tambem passa pelo modifyMiddleware que verifica se o usuario fazendo a requisição é um professor, se sim pode receber qualquer das informações do create
router.delete('/me', authMiddleware, modifyMiddleware,controller.remove.bind(controller)) // delete passa pelo modifyMiddleware pra verificar permição e deleta conforme o Nome e Linguagem

export default router