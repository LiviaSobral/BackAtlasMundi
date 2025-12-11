import { AppDataSource } from '../data-source'
import * as nodemailer from 'nodemailer';
import { User } from '../entities/User'
import { CountryService } from './CountryService'

export class UserService{
    private repo = AppDataSource.getRepository(User)
    private servCountry = new CountryService()

    private async email(userId:number, userInfo:string){
        const transporter = nodemailer.createTransport({
              host: "smtp.gmail.com",
              port: 465,
              secure: true,
              auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASSWORD,
              },
            });
        
            // Monta a URL que o moderador vai clicar para APROVAR a requisição.
            // Ela chama a rota /permission/approve enviando o ID da requisição pendente.
            const approveURL = `http://localhost:3000/permission/approve?id=${userId}`;
        
            // Mesma coisa aqui, só que para negar
            const denyURL = `http://localhost:3000/permission/deny?id=${userId}`;
        
            await transporter.sendMail({
              from: '"Atlas" <atlasmundi0@gmail.com>',
              to: process.env.GMAIL_USER,
              subject: "Solicitação aguardando aprovação",
              html: `
                <h2>Nova solicitação de modificação</h2>
                <p><pre>${userInfo}</pre></p>
                <a href="${approveURL}" style="background:green;color:white;padding:10px;border-radius:5px;">APROVAR</a>
                <br><br>
                <a href="${denyURL}" style="background:red;color:white;padding:10px;border-radius:5px;">NEGAR</a>
              `,
            });
    }

    async create(data:Partial<User>){
        const exists = await this.repo.findOne({where:{email:data.email}})
        if(exists){
            throw new Error("Email ja utilizado")
        }
        data.teacher=false
        
        const user = this.repo.create(data)
        const saved = await this.repo.save(user)
        if(data.cpf){
            //mandar email para pedir a criação de um usuario professor
            this.email(saved.id,JSON.stringify(data))
            data.teacher = false;
        }
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
            //mandar email para pedir a criação de um usuario professor
            this.email(id,JSON.stringify(data))
            user.teacher = false;
        }
        const {password, teacher, ...rest} = data
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
        user.tag = country
        await this.repo.save(user)
        let clone:any = user
        delete clone.password
        delete clone.cpf
        return clone
    }


    // feito pelo jhonny Peter Deusgamer
    async deleteTag(userId: number) {
        const user = await this.repo.findOne({
            where: { id: userId },
            relations: ['tags'],
        })

        if (!user) {
            throw new Error("Usuário não encontrado")
        }

        if (!user.tag ) {
            throw new Error("Esse usuário não possui tag para remover")
        }

        // parte feita pelo gpt, nao sei o que "filter" faz mas eu deduzo que ta tirando a tag do user
        //user.tags = user.tags.filter(tag => tag.id !== countryId)
        user.tag = null

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