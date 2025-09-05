import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate} from 'typeorm'
import bcrypt from 'bcrypt'

@Entity('users')
export class User{
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 120 })
  name: string

  @Column({ unique: true, length: 160 })
  email: string

  @Column()
  password: string

  //verdadeiro se professor MAS se for professor tem q dar cpf tambem
  @Column()
  teacher: boolean

  //opcional para uma conta normal exceto para a de professor, onde se torna obrigatoria.
  @Column({unique: true, length: 11})
  cpf: string

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(){
    //fazer validação melhor se a senha esta em hash ou n
    if(!this.password.startsWith('$2')){
        const rounds = Number(process.env.BCRYPT_SALT_ROUNDS);
        this.password = await bcrypt.hash(this.password,rounds);
    }
  }
  async validatePassword(plain: string): Promise<boolean>{
    return bcrypt.compare(plain,this.password);
  }
}