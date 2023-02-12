import { Injectable } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtService } from '@nestjs/jwt';
import { use } from 'passport';
import { UserDTO } from 'src/dto/user.dto';
import { Role } from 'src/enum/role.enum';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private UserService: UsersService, private jtwService: JwtService) {}

    async validateUser(username: string, email: string, password: string, type: string) {
        console.log("validateUser [l12]:", username, email, password, type)

        const user2: UserDTO = {
            username: username,
            email: email,
            password: password,
            type: type,
            roles: [Role[type[0].toUpperCase() + type.substring(1)]]
        }
        
        console.log("user2 [validateUser]:", user2)

        const user = await this.UserService.create(null)

        console.log("ValidateUser[l23]:", user)

        if (user && user.password == password) {
            const { password, ...result } = user
            return result
        }

        return null
    }

    async login(usuario: string, senha: string) {
        console.log("Login:", usuario, senha)

        const user = await this.UserService.findOne(usuario, senha)

        console.log("Var payload [login]", user)

        return {
            access_token: this.jtwService.sign({user})
        }
    }
}
