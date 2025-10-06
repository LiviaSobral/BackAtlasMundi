import { AppDataSource } from '../data-source'
import { User } from '../entities/User'
import { CountryService } from './CountryService'

export class UserService{
    private repo = AppDataSource.getRepository(User)
    private servCountry = new CountryService()

    async create(data:Partial<User>){
        const exists = await this.repo.findOne({where:{email:data.email}})
        if(exists){
            throw new Error("Email ja utilizado")
        }
        if(data.cpf){
            data.teacher = true;
        }
        const user = this.repo.create(data)
        await this.repo.save(user)
        const clone:any = user
        delete clone.password
        delete clone.cpf
        return clone
    }

    async findById(id:number){
        const user = await this.repo.findOne({where:{id: id}})
        if(!user){
            throw new Error("Usuario não existe")
        }
        const clone:any = user
        delete clone.password
        delete clone.cpf
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
            throw new Error("Usuário não encontrado")
        }
        if(data.password){
            user.password = data.password
        }
        if(data.cpf){
            user.teacher = true;
        }
        const {password, ...rest} = data
        Object.assign(user,rest)
        await this.repo.save(user)
        const clone:any = user
        delete clone.password
        delete clone.cpf
        return clone
    }

    async saveTag(id:number, CountryId:number){
        const user = await this.repo.findOne({where:{id:id}})
        if(!user){
            throw new Error("Usuário não encontrado")
        }
        const country = await this.servCountry.findById(CountryId)
        user.tags?.push(country)
        let clone:any = user
        delete clone.password
        delete clone.cpf
        return clone
    }


    // feito pelo jhonny Peter Deusgamer
    async deleteTag(userId: number, countryId: number) {
        const user = await this.repo.findOne({
            where: { id: userId },
            relations: ['tags'],
        })

        if (!user) {
            throw new Error("Usuário não encontrado")
        }

        if (!user.tags || user.tags.length === 0) {
            throw new Error("Esse usuário não possui tags para remover")
        }

        // parte feita pelo gpt, nao sei o que "filter" faz mas eu deduzo que ta tirando a tag do user
        user.tags = user.tags.filter(tag => tag.id !== countryId)

        await this.repo.save(user)

        const { password, cpf, ...clone } = user

        return clone
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