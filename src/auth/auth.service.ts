import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "src/users/dto/create-user.dto";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    async loginUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email);
        if (!user) throw new UnauthorizedException('Невірні облікові дані');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new UnauthorizedException('Невірні облікові дані');

        const payload = { sub: user.id, username: user.username };
        return { access_token: await this.jwtService.signAsync(payload) };
    }

    async registerUser(createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }
}
