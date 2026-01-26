import { IsNotEmpty, IsOptional, Matches } from "class-validator";

export class CreateCountryDTO{
    @IsNotEmpty({message: "Name cannot be null"})
    @Matches(/^[A-Za-zÀ-ÿ\s]+$/, { message: "Name must only have letters and spaces" })
    name:string;

    @IsNotEmpty({message: "quickInfo cannot be null"})
    quickInfo:string

    @IsOptional()
    url?:string

    @IsNotEmpty({message: "politics cannot be null"})
    politics:string

    @IsNotEmpty({message: "history cannot be null"})
    history:string

    @IsNotEmpty({message: "culture cannot be null"})
    culture:string

    @IsNotEmpty({message: "inEnglish cannot be null"})
    inEnglish:boolean

    @IsNotEmpty({message: "sources cannot be null"})
    sources:string
}