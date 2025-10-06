import {IsNotEmpty} from "class-validator";

export class CreateTagUserDTO{
    @IsNotEmpty({message: "countryId cannot be null"})
    countryId:number;
}