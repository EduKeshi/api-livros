import { Injectable } from '@nestjs/common';
import { deleteById, getAllBooks, getAvailableBooks, getBooksById, reserveBookById, saveBooks, updateById } from 'src/database/books-repository';
import { Books } from 'src/Interfaces/books.Interface';
import { BooksEntrada } from 'src/Interfaces/books.interface.entrada';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class BooksService {

    postBooks(bookEntrada: BooksEntrada) {
        const livroDominio: Books = {
            title: bookEntrada.title,
            author: bookEntrada.author,
            available: bookEntrada.available,
            id: uuidv4()
        }

        saveBooks(livroDominio.title, livroDominio.author, livroDominio.available, livroDominio.id)

        return livroDominio
    }

    mostraLivros() {
        return getAllBooks()
    }

    mostraLivroDetalhadoPeloId(id: string) {
        return getBooksById(id)
    }
    
    alteraUmLivroPeloId(id: string, bookUpdate: BooksEntrada) {
        return updateById(id, bookUpdate)
    }

    getAvailable() {
        return getAvailableBooks()
    }

    reserverUmLivro(id: string) {
        return reserveBookById(id)
    }

    deleteUmLivro(id: string) {
        return deleteById(id)
    }

}
