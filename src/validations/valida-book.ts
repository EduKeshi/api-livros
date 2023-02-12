import { HttpException, HttpStatus } from "@nestjs/common";

export function validaBook(title: string, author: string, available: boolean) {
    if (title.length < 3 || title.length > 60) {
        throw new HttpException("invalid title", HttpStatus.BAD_REQUEST) 
    }
    if (author.length < 3 || author.length > 60) {
        throw new HttpException("invalid author name", HttpStatus.BAD_REQUEST) 
    }
    if (typeof available != "boolean") {
        throw new HttpException("available must be a boolean", HttpStatus.BAD_REQUEST)
    }
}