import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-create-page',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './book-create-page.html',
  styleUrl: './book-create-page.scss'
})
export class BookCreatePage {
  bookForm = new FormGroup({
    isbn: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(13),
        Validators.pattern(/^[0-9]*$/)
      ]
    }),
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: []
    }),
    rating: new FormControl(1, {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.min(1),
        Validators.max(5),
      ]
    }),
    price: new FormControl(0, {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.min(0)
      ]
    }),
  });

  isInvalid(c: FormControl): boolean {
    return c.touched && c.invalid;
  }

  hasError(c: FormControl, errorCode: string): boolean {
    return c.hasError(errorCode) && c.touched;
  }
}


/*
TODO:
- Fehlermeldungen anzeigen
  - "Die ISBN ist ungültig."
  - "Die ISBN ist zu kurz."
- Formular abschicken
- Buch erzeugen
- HTTP
- bei Erfolg:
  - wegnavigieren zur Detailseite
  - Erfolgsmeldung anzeigen
  - Formular zurücksetzen
*/
