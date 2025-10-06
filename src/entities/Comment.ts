import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, ManyToOne} from 'typeorm'
import { User } from './User'
import { Country } from './Country'

@Entity('comments')
export class Comment{
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, user => user.comments)
    user: User

    @ManyToOne(() => Country)
    country:Country

    @Column({ length: 900})
    message:string

    //determina se é uma pergunta que pode ser respondida por um professor, defaut seria false para sugestões de mudanças
    @Column()
    isQuestion:boolean
    
    @OneToOne(() => Comment, {nullable:true})
    related?:Comment

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}