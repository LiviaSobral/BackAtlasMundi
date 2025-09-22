import { IsOptional } from "class-validator";

export class UpdateCommentDTO{
    @IsOptional()
    userId:number;

    @IsOptional()
    countryId:number

    @IsOptional()
    message:string

    @IsOptional()
    isQuestion:boolean
}