import { AppDataSource } from '../data-source'
import { Comment } from '../entities/Comment'
import { CountryService } from './CountryService'
import { UserService } from './UserService'

export class CommentService {
    private repo = AppDataSource.getRepository(Comment)
    private serv = new UserService()
    private servCountry = new CountryService()

    async create(userId:number, countryId:number, message:string, isQuestion:boolean, relatedTo?:number){
        const user = await this.serv.findById(userId)
        const country = await this.servCountry.findById(countryId)
        let data
        if(relatedTo){
            const related = await this.findById(relatedTo)
            data = {user, country, message, isQuestion, related}
        }else{
            data = {user, country, message, isQuestion}
        }        
        const comment = this.repo.create(data)
        return await this.repo.save(comment)
    }

    async update(userId:number, data: Partial<Comment>){
        const user = await this.serv.findById(userId)
        const comment = await this.repo.findOne({where:{id:data.id, user:user}})
        if(!comment){
            throw new Error("Comment not found")
        }
        Object.assign(comment,data)
        return await this.repo.save(comment);
    }

    async findById(id:number){
        const comment = await this.repo.findOne({where:{id:id}})
        if(!comment){
            throw new Error("Comment not found")
        }
        return comment;
    }

    async findByUser(userId:number){
        const user = await this.serv.findById(userId)
        const comments = await this.repo.find({where:{user:user}})
        return comments
    }

    async findByCountry(countryId:number){
        const country = await this.servCountry.findById(countryId)
        const comments = await this.repo.find({where:{country:country}})
        return comments
    }

    async remove(userId:number,id:number){
        const user = await this.serv.findById(userId)
        const comment = await this.repo.findOne({where:{id:id, user:user}})
        if(!comment){
            throw new Error("Comment not found")
        }
        await this.repo.remove(comment);
        return {message: 'Comment deleted'}
    }
}