import 'reflect-metadata'
import { DataSource } from 'typeorm';
import * as dotenv from "dotenv";
import { User } from './entities/User';
import { Country } from './entities/Country';
import { Comment } from './entities/Comment';

dotenv.config();
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
export const AppDataSource = new DataSource({
    type:'mysql',
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    synchronize: true, //TEMPORARIO REMOVER DEPOIS
    entities:[User,Country,Comment]
});
