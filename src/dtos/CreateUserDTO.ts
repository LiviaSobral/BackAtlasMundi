import { IsEmail, IsNotEmpty, IsOptional, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDTO{
    @IsNotEmpty({message: "Name cannot be null"})
    @Matches(/^[A-Za-zÀ-ÿ\s]+$/, { message: "Name must only have letters and spaces" })
    name:string;
    @IsNotEmpty({message: "Email cannot be null"})
    @IsEmail({},{message:"Invalid Email"})
    email:string;
    @IsNotEmpty({message: "Password cannot be null"})
    @MinLength(6, { message: "Password must be at least 6 letters long" })
    password:string;

    @MinLength(11, { message: "CPF must be 11 letters long" })
    @MaxLength(11, { message: "CPF must be 11 letters long" })
    @IsOptional()
    cpf?:string
}