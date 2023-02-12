import { Injectable } from '@nestjs/common';
import { cadastraUsuario, findUser } from 'src/database/books-repository';
import { UserDTO } from 'src/dto/user.dto';

@Injectable()
export class UsersService {
    async create(userDTO: UserDTO) {
        return cadastraUsuario(userDTO.username, userDTO.email, userDTO.password, userDTO.type)
    }

    async findOne(usuario: string, senha: string) {
        return findUser(usuario, senha)
    }
}
