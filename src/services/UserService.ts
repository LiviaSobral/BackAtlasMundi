import { AppDataSource } from '../data-source'
import { User } from '../entities/User'

export class UserService{
    private repo = AppDataSource.getRepository(User)

    async create(data:Partial<User>){
        const exists = await this.repo.findOne({where:{email:data.email}})
        if(exists){
            throw new Error("Email ja utilizado")
        }
        if(data.cpf){
            data.teacher = true;
        }else{
            data.teacher = false;
        }
        const user = this.repo.create(data)
        return await this.repo.save(user)
    }

    async findById(id:number){
        const user = await this.repo.findOne({where:{id: id}})
        if(!user){
            throw new Error("Usuario não existe")
        }
        const clone:any = user
        delete clone.password
        return clone
    }

    async findByEmail(email:string){
        const user = await this.repo.findOne({where:{email:email}})
        if(!user){
            throw new Error("Email não cadastrado")
        }
        return user;
    }

    async update(id:number, data: Partial<User>){
        const user = await this.repo.findOne({where:{id:id}})
        if(!user){
            throw new Error("Usuario não encontrado")
        }
        if(data.password){
            user.password = data.password
        }
        const {password, ...rest} = data
        Object.assign(user,rest)
        return await this.repo.save(user)
    }

    async remove(id:number){
        const user = await this.repo.findOne({where:{id:id}})
        if(!user){
            throw new Error("Usuario não encontrado")
        }
        await this.repo.remove(user)
        return {message: "Usuario Removido"}
    }
}