import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../utils/jwt'

export const modifyMiddleware = (req:Request,res:Response,next:NextFunction) =>{
    if((req as any).user.teacher){
        next()
    }
    return res.status(401).json({message:"Sem Permissão para acesso"})
}