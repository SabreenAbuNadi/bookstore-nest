/*the important modules were imported from @nestjs/common and
I also import both the BooksService and CreateBookDTO respectively.
CreateBookDTO is a data transfer object, a TypeScript class created 
for type-checking and to define the structures of what an object looks 
like when creating a new book*/

import { Controller, Get, Param, Post, Body, Query, Delete } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDTO } from './dto/create-book.dto';

@Controller('books')
export class BooksController {
    /*I used constructor to inject the BooksService into the controller and created four different methods*/
    constructor(private booksService: BooksService) { }

    @Get()
    async getBooks() {/*Used to fetch the list of all books. 
    It has @Get() decorator attached to it. 
    This helps to map any GET request sent to /books to this controller*/
        const books = await this.booksService.getBooks();
        return books;
    }

    @Get(':bookID')
    async getBook(@Param('bookID') bookID) {/*Used to retrieve the details of 
        a particular book by passing the bookID as a parameter*/
        const book = await this.booksService.getBook(bookID);
        return book;
    }

    @Post()
    async addBook(@Body() createBookDTO: CreateBookDTO) {
        /*Used to create and post a new book to the existing book list*/
        const book = await this.booksService.addBook(createBookDTO);
        return book;
    }

    @Delete()
    async deleteBook(@Query() query) {
        // Used to delete a book by passing the bookID as a query parameter
        const books = await this.booksService.deleteBook(query.bookID);
        return books;
    }
}