import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.default),
  },
  {
    path: 'book/:id',
    loadComponent: () => import('./pages/book-page/book-page.component').then((m) => m.BookPageComponent),
  },
]
