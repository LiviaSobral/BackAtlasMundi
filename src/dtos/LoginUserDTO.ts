import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginUserDTO{
    @IsNotEmpty({message: "Email cannot be null"})
    @IsEmail({},{message:"Invalid Email"})
    email:string;

    @IsNotEmpty({message: "Password cannot be null"})
    password:string;
}