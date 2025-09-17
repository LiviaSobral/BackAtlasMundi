import { Request, Response } from 'express'
import { UserService } from '../services/UserService'
import { generateToken } from '../utils/jwt'

const service = new UserService()

export class AuthController{
    async register(req: Request, res: Response){
        try{
            const user = await service.create(req.body)
            const user2 = await service.findByEmail(user.email)
            if (!user2) {return res.status(404).json({ message: 'Usuário não encontrado' })}
            const token = generateToken({id: user2.id, email: user2.email, teacher: user2.teacher||false})
            const safe:any = user
            delete safe.password
            res.status(201).json({user:safe,token})
        }catch(e:any){
            res.status(400).json({message:e.message})
        }
    }
    async login(req: Request, res: Response){
        try{
            const {email,password} = req.body
            const user = await service.findByEmail(email)
            if (!user) return res.status(404).json({ message: 'Usuário não encontrado' })
            const valid = await user.validatePassword(password)
            if(!valid){
                return res.status(401).json({message:"Senha invalida"})
            }
            const safe:any = {...user}
            delete safe.password
            const token = generateToken({id: safe.id, email: safe.email, teacher:safe.teacher})
            res.json({user:safe,token})
            
        }catch(e:any){
            res.status(400).json({message: e.message})
        }
    }
}