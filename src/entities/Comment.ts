import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('comments')
export class Comment{
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 120 })
    username: string

    @Column({ length: 900})
    message:string

    //determina se é uma pergunta que pode ser respondida por um professor, defaut seria false para sugestões de mudanças
    @Column()
    isQuestion:boolean

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}