import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      passReqToCallback: true
    })
  }

  async validate(req: any, username: string, password: string) {
    const tiposDeUsuariosValidos = ["administrador", "cliente"]

    if (!tiposDeUsuariosValidos.includes(req.body.type)) {
      throw new HttpException("invalid type", HttpStatus.BAD_REQUEST)
    }

    const user = await this.authService.validateUser(password);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}