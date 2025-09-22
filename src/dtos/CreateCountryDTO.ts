import { IsNotEmpty, IsOptional, Matches } from "class-validator";

export class CreateCountryDTO{
    @IsNotEmpty({message: "Name cannot be null"})
    @Matches(/^[A-Za-zÀ-ÿ\s]+$/, { message: "Name must only have letters and spaces" })
    name:string;

    @IsNotEmpty({message: "quickInfo cannot be null"})
    quickInfo:string

    @IsOptional()
    url?:string

    @IsNotEmpty({message: "Politics cannot be null"})
    politics:string

    @IsNotEmpty({message: "Politics2 cannot be null"})
    politics2:string

    @IsNotEmpty({message: "History cannot be null"})
    history:string

    @IsNotEmpty({message: "History2 cannot be null"})
    history2:string

    @IsNotEmpty({message: "Culture cannot be null"})
    culture:string

    @IsNotEmpty({message: "Culture2 cannot be null"})
    culture2:string

    @IsNotEmpty({message: "IsEnglish cannot be null"})
    inEnglish:boolean

    @IsNotEmpty({message: "Sources cannot be null"})
    sources:string
}