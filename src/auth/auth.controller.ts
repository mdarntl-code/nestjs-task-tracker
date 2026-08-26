import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    login(@Body() loginUser: LoginUserDto) {
        return this.authService.loginUser(loginUser.email, loginUser.password);
    }

    @Post("register")
    register(@Body() createUserDto: CreateUserDto) {
        return this.authService.registerUser(createUserDto)
    }
}
