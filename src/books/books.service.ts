//imported the requires modules from Nest.js and also BOOKS from the mock data I created earlier

import { Injectable, HttpException } from '@nestjs/common';
import { BOOKS } from '../mocks/books.mock';

@Injectable()
export class BooksService {
    books = BOOKS;
    /*created two different methods named getBooks() and getBook()
    to retrieve the list of books from the mock data and to fetch just
    one book using the bookID as a parameter*/
    getBooks(): Promise<any> {
        return new Promise(resolve => {
            resolve(this.books);
        });
    }
    getBook(bookID): Promise<any> {
        let id = Number(bookID);
        return new Promise(resolve => {
            const book = this.books.find(book => book.id === id);
            if (!book) {
                throw new HttpException('Book does not exist!', 404);
            }
            resolve(book);
        });
    }
    //This method will be used to push a new book to the existing list
    addBook(book): Promise<any> {
        return new Promise(resolve => {
            this.books.push(book);
            resolve(this.books);
        });
    }
    //This method to delete a particular book using the bookID as a parameter
    deleteBook(bookID): Promise<any> {
        let id = Number(bookID);
        return new Promise(resolve => {
            let index = this.books.findIndex(book => book.id === id);
            if (index === -1) {
                throw new HttpException('Book does not exist!', 404);
            }
            this.books.splice(1, index);
            resolve(this.books);
        });
    }
}