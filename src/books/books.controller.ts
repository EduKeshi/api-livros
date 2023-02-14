import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Req } from '@nestjs/common';
import { LivroDTO } from 'src/dto/postLivro.dto';
import { BooksService } from './books.service/books.service';

@Controller('books')
export class BooksController {
    constructor(private BooksService: BooksService) {}
    
    @Post()
    postBooks(@Body() livroDTO: LivroDTO, @Req() req) {

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
    getBooks() {
        return this.BooksService.showBooks()
    }

    @Get("/available")
    getAvailable() {
        return this.BooksService.getAvailable()
    }

    @Get("/:id")
    getBookById(@Param("id") id) {
        return this.BooksService.showDetailedBooksById(id)
    }

    @Put("/:id")
    async putBookById(@Param("id") id, @Body() livroDTO: LivroDTO, @Req() req) {
        if (req.user.type != "administrador") {
            throw new HttpException("unauthorized", HttpStatus.UNAUTHORIZED)
        }

        const updatedBook = await this.BooksService.changeBookById(id, livroDTO)

        if (updatedBook == false) {
            throw new HttpException("book do not exists", HttpStatus.BAD_REQUEST)
        }

        return updatedBook
    }

    @Put("/available/:id")
    async reserveBook(@Param("id") id, @Req() req) {
        if (req.user.type != "cliente") {
            throw new HttpException("unauthorized", HttpStatus.UNAUTHORIZED)
        }
        
        const reservedBook = await this.BooksService.reserveBook(id)

        console.log(reservedBook)

        if (reservedBook == false) {
            throw new HttpException("book unavailable", HttpStatus.BAD_REQUEST)  
        }

        return reservedBook
    }

    @Delete("/:id")
    async deleteBook(@Param("id") id, @Req() req) {
        if (req.user.type != "administrador") {
            throw new HttpException("unauthorized", HttpStatus.UNAUTHORIZED)
        }

        const deletedBook = await this.BooksService.deleteBook(id)

        if (deletedBook == false) {
            throw new HttpException("book do not exists", HttpStatus.BAD_REQUEST)  
        }

        return deletedBook
    }
}
