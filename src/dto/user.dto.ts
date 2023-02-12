import { Role } from "src/enum/role.enum"

export class UserDTO {
    username: string
    email: string
    password: string
    type: string
    roles: Role[]

}