import mongoose, { model, Schema } from "mongoose";
import { Books } from "src/Interfaces/books.Interface";
import { BooksEntrada } from "src/Interfaces/books.interface.entrada";
import { UserDominio } from "src/Interfaces/user-dominio.interface";
import { v4 as uuidv4 } from 'uuid';

const bookSchema = new Schema<Books>({
    title: { type: String, required: true },
    author: { type: String, required: true },
    available: { type: Boolean, required: true },
    id: { type: String, required: true }
})

const userSchema = new Schema<UserDominio>({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    type: { type: String, required: true },
    id: { type: String, required: true }
})

const bookModel = model<Books>("Books", bookSchema)
const userModel = model<UserDominio>("Users", userSchema)

export async function saveBooks(bookTitle: string, bookAuthor: string, bookAvailable: boolean, bookId: string) {    
    try {
        await mongoose.connect("mongodb://localhost:27017")

        const newBook = new bookModel({
            title: bookTitle,
            author: bookAuthor,
            available: bookAvailable,
            id: bookId
        })

        await newBook.save()

    } catch (err) {
        console.log(err)
    }
}

export async function getAllBooks() {
    await mongoose.connect("mongodb://localhost:27017")

    const query = bookModel.find().all("books", [])

    return query
}

export async function getAvailableBooks() {
    await mongoose.connect("mongodb://localhost:27017")

    const query = bookModel.where("available").equals(true)

    return query
}

export async function getBooksById(id: string) {
    await mongoose.connect("mongodb://localhost:27017")

    const book = bookModel.findOne({ id: id })

    return book
}

export async function updateById(id: string, newBook: BooksEntrada) {
    await mongoose.connect("mongodb://localhost:27017")

    const book = await bookModel.findOne({ id: id })

    if (book == null) {
        return false
    }

    book.title = newBook.title
    book.author = newBook.author
    book.available = newBook.available
    book.save()

    return book
}

export async function reserveBookById(id: string) {
    await mongoose.connect("mongodb://localhost:27017")

    const book = await bookModel.findOne({ id: id })

    if (book.available == false) {
        return false
    }

    book.available = false
    book.save()
    
    return book
}

export async function deleteById(id: string) {
    await mongoose.connect("mongodb://localhost:27017")

    const book = await bookModel.findOne({ id: id })

    if (book == null) {
        return false
    }

    await bookModel.deleteOne({ id: id })

    return book
}

export async function registerUser(name: string, email: string, password: string, type: string) {
    mongoose.connect("mongodb://localhost:27017")

    const findUser = await userModel.findOne({ email: email })

    if (findUser != null) {
        return false
    }

    const newUser = new userModel({
        username: name,
        email: email,
        password: password,
        type: type,
        id: uuidv4()
    })

    await newUser.save()

    const user = await userModel.findOne({ id: newUser.id })

    console.log("validaUser DB:", user)

    return user

}

export async function findUser(usuario: string, senha: string) {
    mongoose.connect("mongodb://localhost:27017")
    
    const user = await userModel.findOne({
        username: usuario,
        password: senha
    })

    if (user == null) {
        return false
    }

    return user
}
