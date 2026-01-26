import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Comment } from './Comment';
import { User } from './User'; 

@Entity('countries')
export class Country{
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 120})
  name: string

  //informações rapidas
  @Column({ length: 400 })
  quickInfo: string;

  @Column({length:300, nullable:true})
  pictureUrl:string

  //informações da politica
  @Column({ length: 880 })
  politics:string;

  @Column({ length: 880 })
  history:string;

  @Column({ length: 880 })
  culture: string;

  //para facilitar a mudança de linguagem, assim o front so muda a solicitação para receber apenas as q possuem inEnglish: true, ou reverte para apenas false
  @Column()
  inEnglish: boolean;

  //fonte de onde a informação foi tirada
  @Column({ length: 880 })
  sources:string;

  @OneToMany(() => Comment, comment => comment.country, {nullable: true, onDelete: "CASCADE"})
  Comments:Comment[]

}