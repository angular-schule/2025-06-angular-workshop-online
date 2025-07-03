import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Book } from '../shared/book';
import { BookStore } from '../shared/book-store';
import { filter, map, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-book-details-page',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './book-details-page.html',
  styleUrl: './book-details-page.scss'
})
export class BookDetailsPage {
  #route = inject(ActivatedRoute);
  #bookStore = inject(BookStore);

  protected book = toSignal(this.#route.paramMap.pipe(
    map(params => params.get('isbn')),
    filter(isbn => isbn !== null),
    switchMap(isbn => this.#bookStore.getSingle(isbn))
  ));
}
