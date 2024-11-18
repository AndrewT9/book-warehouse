import { BookService } from './../../services/book.service'
import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject, Inject, OnInit } from '@angular/core'
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { Subject } from 'rxjs'
import { NewFilingForm } from './book-form.class'
import type { Book } from '../../models/book.interface'
import { MatSnackBar } from '@angular/material/snack-bar'
@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    CommonModule,
  ],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookFormComponent implements OnInit {
  private filterEventEmitter = new Subject()
  public formGroup: FormGroup | undefined;
  public submitted = false;
  public btnText = this.data ? 'Update' : 'Add'

  constructor(
    private bookService: BookService,
    public dialogRef: MatDialogRef<BookFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Book,
  ) {}

  ngOnInit() {
    this.formGroup = new NewFilingForm(this.data)
    this.filterEventSource(this.filterEventEmitter)
  }

  private _snackBar = inject(MatSnackBar)

  public openSnackBar(message: string, action: string, duration: number) {
    this._snackBar.open(message, action, { duration })
  }

  public get form() {
    return this.formGroup?.controls
  }

  private filterEventSource(event: { subscribe: (arg0: (event: any) => void) => void }) {
    event.subscribe(this.reloadData)
  }

  private reloadData(event: any) {
    console.log(event)
  }

  public createForm() {
    this.formGroup = new NewFilingForm()
  }

  public onSubmit() {
    const snakeBarText = this.data ? 'Updated' : 'Added'
    this.submitted = true

    if (!this.formGroup?.valid) return;

    if (this.data?.id) {
      this.bookService.updateBook({
        ...this.formGroup?.value,
        id: this.data.id,
      })
    } else {
      this.bookService.addBook(this.formGroup?.value)
    }

    this.dialogRef.close()
    this.openSnackBar(`Successful ${snakeBarText}`, 'Ok', 2000)
  }
}
