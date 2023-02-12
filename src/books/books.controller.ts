import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Req, SetMetadata, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.gaurd';
import { LivroDTO } from 'src/dto/postLivro.dto';
import { Permissions } from 'src/enum/permission.enum';
import { Role } from 'src/enum/role.enum';
import { RequierePermissions } from 'src/RBAC/permissions.decorator';
import { Roles } from 'src/RBAC/roles.decorator';
import { validaBook } from 'src/validations/valida-book';
import { BooksService } from './books.service/books.service';

@Controller('books')
export class BooksController {
    constructor(private BooksService: BooksService) {}
    
    @Post()
    postLivros(@Body() livroDTO: LivroDTO, @Req() req) {

        if (req.user.type != "administrador") {
            throw new HttpException("unauthorized", HttpStatus.UNAUTHORIZED)
        }

        validaBook(livroDTO.title, livroDTO.author, livroDTO.available)

        return this.BooksService.postBooks(livroDTO)       
    }

    @Get()
    getLivros() {
        return this.BooksService.mostraLivros()
    }

    @Get("/available")
    getAvailable() {
        return this.BooksService.getAvailable()
    }

    @Get("/:id")
    getBookById(@Param("id") id) {
        return this.BooksService.mostraLivroDetalhadoPeloId(id)
    }

    @Put("/:id")
    @Roles(Role.Adiministrador)
    putBookById(@Param("id") id, @Body() livroDTO: LivroDTO, @Req() req) {
        if (req.user.type != "administrador") {
            throw new HttpException("unauthorized", HttpStatus.UNAUTHORIZED)
        }

        return this.BooksService.alteraUmLivroPeloId(id, livroDTO)
    }

    @Put("/available/:id")
    @Roles(Role.Cliente)
    reserveBook(@Param("id") id, @Req() req) {
        if (req.user.type != "cliente") {
            throw new HttpException("unauthorized", HttpStatus.UNAUTHORIZED)
        }
        
        return this.BooksService.reserverUmLivro(id)
    }

    @Delete("/:id")
    @Roles(Role.Adiministrador)
    deleteBook(@Param("id") id, @Req() req) {
        if (req.user.type != "administrador") {
            throw new HttpException("unauthorized", HttpStatus.UNAUTHORIZED)
        }

        return this.BooksService.deleteUmLivro(id)
    }
}
