import { BookService } from './../../services/book.service'
import { Component, OnDestroy, ViewContainerRef } from '@angular/core'
import { BooksListComponent } from '../../components/item-list/item-list.component'
import { SearchComponent } from '../../components/search/search.component'
import { MatDialog } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { BookFormComponent } from '../../components/book-form/book-form.component'
import { CommonModule } from '@angular/common'
import { Book } from '../../models/book.interface'
import { Router } from '@angular/router'
import { catchError, debounceTime, map, of, share } from 'rxjs'

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
  standalone: true,
  providers: [BookService],
  imports: [BooksListComponent, SearchComponent, MatButtonModule, CommonModule],
})
export default class HomePage implements OnDestroy {
  public books = this.bookService.getBooks()

  constructor(
    public dialog: MatDialog,
    private bookService: BookService,
    private router: Router,
    private viewContainerReference: ViewContainerRef,
  ) {}

  public handleUpdate(book: Book) {
    this.bookService.updateBook(book)
    this.openDialog(book)
  }

  public handleDelete(id: number) {
    this.bookService.deleteBook(id)
  }

  public handleItemClicked(item: Book) {
    this.router.navigate(['/book', item.id], { state: { itemData: item } })
  }

  public openDialog(book?: Book): void {
    this.dialog.open(BookFormComponent, {
      minWidth: '250px',
      data: book,
      viewContainerRef: this.viewContainerReference,
    })
  }

  public onSearch(query: string = ''): void {
    this.bookService.booksSource$
      .pipe(
        debounceTime(500),
        map((books: Book[]) => {
          if (!query) {
            return books
          }

          return books.filter(
            (book: Book) =>
              book.title.toLowerCase().includes(query.toLowerCase()) ||
              book.author.toLowerCase().includes(query.toLowerCase()),
          )
        }),
        catchError((error) => {
          console.error('Error occurred during search', error)
          return of([])
        }),
      )
      .subscribe((filteredBooks) => {
        this.bookService.searchBooksSource$.next(filteredBooks);
      })
  }

  ngOnDestroy() {
    this.bookService.booksSource$.unsubscribe()
  }
}
