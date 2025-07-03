import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of, interval } from 'rxjs';
import { BookActions } from './book.actions';
import { BookStore } from '../shared/book-store';


@Injectable()
export class BookEffects {

  actions$ = inject(Actions);
  #bookStore = inject(BookStore);

  /*
  Aufgabe des Effects:
  - wenn loadBooks kommt
  - BookStore.getAll()
  - wenn erfolgreich, dann loadBooksSuccess()
  - wenn nicht, dann laodBooksFailure()
  */

  loadBooks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BookActions.loadBooks),
      concatMap(() => this.#bookStore.getAll().pipe(
        map(books => BookActions.loadBooksSuccess({ data: books })),
        catchError(err => {
          // Fehler ersetzen
          return of(BookActions.loadBooksFailure({ error: err.message }))
        })
      ))
    )
  });

  /*interval$ = createEffect(() => {
    return interval(1000).pipe(
      map(i => {
        return { type: 'interval', data: i }
      })
    );
  })*/
}
