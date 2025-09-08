import jwt from 'jsonwebtoken'

interface Payload {
  id: number
  email: string
  teacher: boolean
}

export const generateToken = (payload: Payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: Number(process.env.JWT_EXPIRES_IN)})
}

export const verifyToken = (token:string) => {
    try{
        return jwt.verify(token, process.env.JWT_SECRET!)
    }catch(err:any){
        return null;
    }
}