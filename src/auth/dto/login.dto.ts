import { IsEmail, IsString, MinLength } from "class-validator";

export class LoginUserDto {
    @IsEmail({}, { message: 'Невірний формат пошти' })
    email: string;

    @IsString()
    @MinLength(6, { message: 'Пароль занадто короткий' })
    password: string;
}