import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateCommentDTO{

    @IsNotEmpty({message: "countryId cannot be null"})
    countryId:number

    @IsNotEmpty({message: "message cannot be null"})
    message:string

    @IsNotEmpty({message: "isQuestion cannot be null"})
    isQuestion:boolean

    @IsOptional()
    relatedTo?:number
}