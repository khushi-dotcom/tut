import { IsEmail, IsNotEmpty, IsString } from "class-validator"

//create body structure
export class AuthDto {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password : string
}