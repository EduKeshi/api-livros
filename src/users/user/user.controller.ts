import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { Public } from 'src/auth/public-decorator';
import { UserDTO } from 'src/dto/user.dto';
import { UsersService } from '../users.service';


@Controller('user')
export class UserController {
    constructor(private usersService: UsersService) { }

    @Public()
    @Post()
    async signUp(@Body() req: UserDTO) {
        const regexUsername = /[0-@]|[ -/]/
        const regexPasswordLetrasMaiusculas = /[A-Z]/
        const regexPasswordLetrasMinusculas = /[a-z]/
        const regexPasswordNumeros = /[0-9]/
        const regexPasswordSimbolos = /[!-/]/

        if (req.username.length < 5 || req.username.length > 100 || req.username.match(regexUsername)) {
            throw new HttpException("invalid username", HttpStatus.BAD_REQUEST)
        }
        if (req.email.length < 5 || req.email.length > 100) {
            throw new HttpException("invalid email", HttpStatus.BAD_REQUEST)
        }
        if (req.password.length < 8 || !req.password.match(regexPasswordLetrasMaiusculas) || !req.password.match(regexPasswordLetrasMinusculas) || !req.password.match(regexPasswordNumeros) || !req.password.match(regexPasswordSimbolos)) {
            throw new HttpException("invalid password", HttpStatus.BAD_REQUEST)
        }
        
        return this.usersService.create(req)
    }
}
