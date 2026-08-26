import { IsEmail, IsString, MinLength } from "class-validator";
import { Column } from "typeorm";
export class CreateUserDto {
    @IsString()
    username: string;

    @IsEmail({}, { message: 'Будь ласка, введіть коректну електронну адресу' })
    email: string;

    @IsString()
    @MinLength(6, { message: 'Пароль має містити щонайменше 6 символів' })
    password: string;
}

