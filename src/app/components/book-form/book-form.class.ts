import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Book } from '../../models/book.interface'

export enum NewFilingFormControls {
  Title = 'title',
  Author = 'author',
  Year = 'year',
  Description = 'description',
  ImageUrl = 'imageUrl',
}

export class NewFilingForm extends FormGroup {
  constructor(data?: Book) {
    super({
      [NewFilingFormControls.Title]: new FormControl(data?.title ?? '', Validators.required),
      [NewFilingFormControls.Author]: new FormControl(data?.author ?? '', Validators.required),
      [NewFilingFormControls.Year]: new FormControl(data?.year, [Validators.required, Validators.pattern('^[0-9]*$')]),
      [NewFilingFormControls.Description]: new FormControl(data?.description, Validators.required),
      [NewFilingFormControls.ImageUrl]: new FormControl(data?.imageUrl, Validators.required),
    })
  }
}
