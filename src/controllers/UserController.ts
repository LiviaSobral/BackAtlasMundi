import { Request, Response } from 'express'
import { UserService } from '../services/UserService'

const service = new UserService()

export class UserController{
    async getById(req: Request, res: Response){
        try{
            const user = await service.findById((req as any).user.id)
            const clone:any = user
            delete clone.password
            res.json(clone)
        }catch(e:any){
            res.status(400).json({message: e.message})
        }
    }
    async update(req:Request,res:Response){
        try{
            const user = await service.update((req as any).user.id, req.body)
            const clone:any = user
            delete clone.password
            res.json(clone)
        }catch(e:any){
            res.status(400).json({message: e.message})
        }
    }
    async remove(req:Request,res:Response){
        try{
            const result = await service.remove((req as any).user.id)
            res.json(result)
        }catch(e:any){
            res.status(404).json({message: e.message})
        }
    }
}