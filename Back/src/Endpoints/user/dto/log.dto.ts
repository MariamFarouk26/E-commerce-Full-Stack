import { IsNotEmpty, IsString, IsEmail } from "class-validator";

export class LoginDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    public email:string;

    @IsNotEmpty()
    @IsString()
    public password:string;
}
