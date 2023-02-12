import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { validaUser } from 'src/validations/valida-user';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      passReqToCallback: true
    })
  }

  async validate(req: any, username: string, password: string) {
    console.log("Validate:", `\n Nome do Usuário: ${username}`, `\n Senha: ${password}`, `\n Email: ${req.body.email}`, `\n Tipo: ${req.body.type}`)
    
    validaUser(username, password, req.body.email, req.body.type)

    const user = await this.authService.validateUser(username, req.body.email, password, req.body.type);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}