import { BooksService } from "./books.service";
import { getAllBooks } from "src/database/books-repository";

jest.mock("src/database/books-repository.ts")

describe('BooksService', () => {
  describe("mostraLivros", () => {
    it("quando receber um solicitação deve retornar os livros", () => {
      const resultado = []

      const booksService = new BooksService
      // getAllBooks.mockResolvedValue(resultado)

      expect(booksService.mostraLivros()).toBe(resultado)
    });
  })
  
});
