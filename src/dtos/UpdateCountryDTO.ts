import { IsNotEmpty, IsOptional, Matches } from "class-validator";

export class UpdateCountryDTO{
    @IsNotEmpty({message: "Name cannot be null"})
    @IsOptional()
    @Matches(/^[A-Za-zÀ-ÿ\s]+$/, { message: "Name must only have letters and spaces" })
    name?:string;

    @IsNotEmpty({message: "quickInfo cannot be null"})
    @IsOptional()
    quickInfo?:string

    @IsOptional()
    url?:string

    @IsNotEmpty({message: "Politics cannot be null"})
    @IsOptional()
    politics?:string

    @IsNotEmpty({message: "History cannot be null"})
    @IsOptional()
    history:string

    @IsNotEmpty({message: "Culture cannot be null"})
    @IsOptional()
    culture:string

    @IsNotEmpty({message: "IsEnglish cannot be null"})
    @IsOptional()
    inEnglish:boolean

    @IsNotEmpty({message: "Sources cannot be null"})
    @IsOptional()
    sources:string
}