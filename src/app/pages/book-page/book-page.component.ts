import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { Location } from '@angular/common'
import { MatCardModule } from '@angular/material/card'
import { Book } from '../../models/book.interface'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { Router } from '@angular/router'

@Component({
  selector: 'app-book-page',
  standalone: true,
  imports: [MatCardModule, FontAwesomeModule],
  templateUrl: './book-page.component.html',
  styleUrl: './book-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookPageComponent implements OnInit {
  public itemData: Book | undefined;
  public faHome = faArrowCircleLeft;

  constructor(private location: Location, private router: Router) {}

  ngOnInit() {
    const navigation: any = this.location.getState()
    if (navigation && navigation['itemData']) {
      this.itemData = navigation['itemData']
    }
  }

  public goBack() {
    this.router.navigate(['/']);
  }

}
