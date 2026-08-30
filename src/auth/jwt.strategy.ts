import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      // Звідки беремо токен (з заголовка Authorization як Bearer token)
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // Читаємо наш секрет з файлу .env для розшифровки
      secretOrKey: configService.get<string>('JWT_SECRET')!,
    });
  }

  // Цей метод викличеться АВТОМАТИЧНО, лише якщо токен валідний і не підроблений
  async validate(payload: any) {
    // Те, що ми тут повертаємо, NestJS автоматично покладе у об'єкт `request.user`
    return { id: payload.sub, username: payload.username, role: payload.role };
  }
}
