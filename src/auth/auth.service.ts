import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private UserService: UsersService, private jtwService: JwtService) {}

    async validateUser(password: string) {
        const user = await this.UserService.create(null)

        if (user && user.password == password) {
            const { password, ...result } = user
            return result
        }

        return null
    }

    async login(usuario: string, senha: string) {
        const user = await this.UserService.findOne(usuario, senha)

        return {
            access_token: this.jtwService.sign({user})
        }
    }
}
