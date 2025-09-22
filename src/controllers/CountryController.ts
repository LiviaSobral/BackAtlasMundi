import { Request, Response } from 'express'
import { CountryService } from '../services/CountryService'

const service = new CountryService()

export class CountryController{
    async create(req:Request, res:Response){
        try{
            const country = await service.create(req.body)
            res.json(country)
        }catch(e:any){
            res.status(400).json({message:e.message})
        }
    }
    async getByName(req: Request, res: Response){
        try{
            const country = await service.findByName(req.body.name, req.body.inEnglish)
            res.json(country)
        }catch(e:any){
            res.status(400).json({message: e.message})
        }
    }
    async getById(req:Request,res:Response){
        try{
            const country = await service.findById(req.body.id)
            res.json(country)
        }catch(e:any){
            res.status(400).json({message: e.message})
        }
    }
    async update(req:Request,res:Response){
        try{
            const country = await service.update(req.body.name,req.body.inEnglish, req.body)
            res.json(country)
        }catch(e:any){
            res.status(400).json({message: e.message})
        }
    }
    async remove(req:Request,res:Response){
        try{
            const result = await service.remove(req.body.name, req.body.lang)
            res.json(result)
        }catch(e:any){
            res.status(404).json({message: e.message})
        }
    }
}