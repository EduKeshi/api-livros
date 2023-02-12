import { HttpException, HttpStatus } from "@nestjs/common";

export function validaUser(name: string, email: string, password: string, type: string) {
    console.log("\nValidaUser:", `\n Nome do Usuário: ${name}`, `\n Senha: ${email}`, `\n Email: ${password}`, `\n Tipo: ${type}`)
    
    const tiposDeUsuariosValidos = ["administrador", "cliente"]

    if (!tiposDeUsuariosValidos.includes(type)) {
        throw new HttpException("invalid type", HttpStatus.BAD_REQUEST)
    }
}