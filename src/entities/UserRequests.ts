import {Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,UpdateDateColumn} from "typeorm";

//dados referentes as tentativas de mudança

@Entity()
export class UserRequest {
  @PrimaryGeneratedColumn()
  id: number;

  // Salva o corpo da requisição (JSON) que o usuário tentou enviar.
  // Isso guarda exatamente o que o usuário quis modificar/inserir.
  @Column("json")
  request_body: any;

  // Coluna que define o status dessa requisição.
  // Pode ser "pending" (aguardando), "approved" (aceita), ou "denied" (negada).
  // O valor padrão quando salva no banco é "pending".
  @Column({
    type: "enum",
    enum: ["pending", "approved", "denied"],
    default: "pending",
  })
  status: "pending" | "approved" | "denied";

  @CreateDateColumn()
  created_at: Date;

  @Column({ type: "datetime", nullable: true })
  approved_at: Date | null;

  @Column({ type: "datetime", nullable: true })
  denied_at: Date | null;
}

