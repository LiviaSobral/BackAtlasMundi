import { Router } from 'express'
import { authMiddleware } from '../middlewares/AuthMiddleware'
import { validateDTO } from '../middlewares/ValidateDTO'
import { CommentController } from '../controllers/CommentController'
import { CreateCommentDTO } from '../dtos/CreateCommentDTO'
import { UpdateCommentDTO } from '../dtos/UpdateCommentDTO'

const router = Router()
const controller = new CommentController()

/*
    quando criando um comment precisa dessas variaveis:

    countryId:number

    message:string

    isQuestion:boolean

    relatedTo?:number(Opcional)
     */

router.post('/me', authMiddleware, validateDTO(CreateCommentDTO), controller.create.bind(controller)) // para criar commentario precisa do id do pais, a mensagem, um boolean se é uma pergunta ou n, e opcionalmente relatedTo (Q caso seja uma resposta a uma pergunta ele vai ter o id da pergunta)
router.get('/country', controller.findByCountry.bind(controller)) //busca todos os commentarios por pais, recebe id do pais
router.get('/user', controller.findByUser.bind(controller)) //busca todos os commentarios de um usuario em especifico, recebe id do usuario
router.get('/id', controller.findById.bind(controller)) //busca um commentario por seu ID
router.put('/me', authMiddleware, validateDTO(UpdateCommentDTO), controller.update.bind(controller)) // atualiza o commentario, recebendo todas as opções permitidas na criação do commentario
router.delete('/me', authMiddleware, controller.remove.bind(controller)) //deleta Comentario, recebe id do comentario

export default router