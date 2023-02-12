import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDTO } from 'src/dto/user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private UserService: UsersService, private jtwService: JwtService) {}

    async validateUser(username: string, email: string, password: string, type: string) {
        const user2: UserDTO = {
            username: username,
            email: email,
            password: password,
            type: type,
        }

        const user = await this.UserService.create(null)

        console.log("ValidateUser[l23]:", user)

        if (user && user.password == password) {
            const { password, ...result } = user
            return result
        }

        return null
    }

    async login(usuario: string, senha: string) {
        const user = await this.UserService.findOne(usuario, senha)

        console.log("Var payload [login]", user)

        return {
            access_token: this.jtwService.sign({user})
        }
    }
}
