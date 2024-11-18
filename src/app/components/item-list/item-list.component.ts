import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { Book } from '../../models/book.interface'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatGridListModule} from '@angular/material/grid-list';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.scss',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatGridListModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksListComponent {
  @Input() items: Book[] | null = [];
  @Output() updateValue = new EventEmitter<Book>();
  @Output() deleteValue = new EventEmitter<number>();
  @Output() handleItemClick = new EventEmitter<any>();

  private _snackBar = inject(MatSnackBar);

  public handleItemClicked(item: Book): void {
    this.handleItemClick.emit(item);
  }

  public openSnackBar(message: string, action: string, duration: number) {
    this._snackBar.open(message, action, { duration });
  }

  public handleUpdate(book: Book): void {
    this.updateValue.emit(book);
  }

  public handleDelete(book: number): void {
    this.deleteValue.emit(book);
    this.openSnackBar('Success deleted', 'Ok', 2000);
  }

}
