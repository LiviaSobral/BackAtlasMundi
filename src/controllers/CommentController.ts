import { Request, Response } from 'express'
import { CommentService } from '../services/CommentService'

const service = new CommentService()

export class CommentController{
    async create(req:Request, res:Response){
        try{
            const comment = await service.create(req.body.userId,req.body.countryId,req.body.message,req.body.isQuestion,req.body.relatedTo)
            res.json(comment)
        }catch(e:any){
            res.status(400).json({message:e.message})
        }
    }
    async update(req:Request,res:Response){
        try{
            const comment = await service.update((req as any).user.id, req.body)
            res.json(comment)
        }catch(e:any){
            res.status(400).json({message: e.message})
        }
    }
    async findById(req:Request,res:Response){
        try{
            const comment = await service.findById(req.body.id)
            res.json(comment)
        }catch(e:any){
            res.status(400).json({message: e.message})
        }
    }
    async findByUser(req:Request,res:Response){
        try{
            const comment = await service.findByUser(req.body.userId)
            res.json(comment)
        }catch(e:any){
            res.status(400).json({message: e.message})
        }
    }
    async findByCountry(req:Request,res:Response){
        try{
            const comment = await service.findByCountry(req.body.countryId)
            res.json(comment)
        }catch(e:any){
            res.status(400).json({message: e.message})
        }
    }
    async remove(req:Request,res:Response){
        try{
            const result = await service.remove((req as any).user.id, req.body.id)
            res.json(result)
        }catch(e:any){
            res.status(404).json({message: e.message})
        }
    }
}