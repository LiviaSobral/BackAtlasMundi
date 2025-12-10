import { Request, Response } from 'express'

export class PermissionController{
    async verifyResponse(req:Request,res:Response){
        try{
            const { data, response } = req.query;
            if(response === "VAI"){
                return res.json(true)
            }
            res.json(false)
        }catch(e:any){
            res.status(400).json({message:e.message})
        }
    }
}