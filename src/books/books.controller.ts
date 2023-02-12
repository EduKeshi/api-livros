import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Req } from '@nestjs/common';
import { LivroDTO } from 'src/dto/postLivro.dto';
import { BooksService } from './books.service/books.service';

@Controller('books')
export class BooksController {
    constructor(private BooksService: BooksService) {}
    
    @Post()
    postLivros(@Body() livroDTO: LivroDTO, @Req() req) {

        if (req.user.type != "administrador") {
            throw new HttpException("unauthorized", HttpStatus.UNAUTHORIZED)
        }
        if (livroDTO.title.length < 3 || livroDTO.title.length > 60) {
            throw new HttpException("invalid title", HttpStatus.BAD_REQUEST) 
        }
        if (livroDTO.author.length < 3 || livroDTO.author.length > 60) {
            throw new HttpException("invalid author name", HttpStatus.BAD_REQUEST) 
        }
        if (typeof livroDTO.available != "boolean") {
            throw new HttpException("available must be a boolean", HttpStatus.BAD_REQUEST)
        }

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
    putBookById(@Param("id") id, @Body() livroDTO: LivroDTO, @Req() req) {
        if (req.user.type != "administrador") {
            throw new HttpException("unauthorized", HttpStatus.UNAUTHORIZED)
        }

        return this.BooksService.alteraUmLivroPeloId(id, livroDTO)
    }

    @Put("/available/:id")
    reserveBook(@Param("id") id, @Req() req) {
        if (req.user.type != "cliente") {
            throw new HttpException("unauthorized", HttpStatus.UNAUTHORIZED)
        }
        
        return this.BooksService.reserverUmLivro(id)
    }

    @Delete("/:id")
    deleteBook(@Param("id") id, @Req() req) {
        if (req.user.type != "administrador") {
            throw new HttpException("unauthorized", HttpStatus.UNAUTHORIZED)
        }

        return this.BooksService.deleteUmLivro(id)
    }
}
