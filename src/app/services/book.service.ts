import { Book } from '../models/book.interface'
import { BehaviorSubject, Observable } from 'rxjs'
import { BOOKS } from '../models/books.const'

export class BookService {
  public booksSource$ = new BehaviorSubject<Book[]>(BOOKS);
  public searchBooksSource$ = new BehaviorSubject<Book[]>(BOOKS);

  public getBooks(): Observable<Book[]> {
    return this.searchBooksSource$;
  }

  public addBook(book: Book): void {
    const newBook = { ...book, id: this.searchBooksSource$.value.length + 1 };
    this.searchBooksSource$.next([...this.searchBooksSource$.value, newBook]);
    this.booksSource$.next([...this.booksSource$.value, newBook]);
  }

  public deleteBook(id: number): void {
    const updatedBooks = this.booksSource$.value.filter((b) => b.id !== id);
    this.booksSource$.next(updatedBooks);
    this.searchBooksSource$.next(updatedBooks)
  }

  public updateBook(updatedBook: Book): void {
    const books = this.booksSource$.value;
    const index = books.findIndex((b) => b.id === updatedBook.id);
    if (index > -1) {
      books[index] = updatedBook;
      this.searchBooksSource$.next([...books])
    }
  }

}
