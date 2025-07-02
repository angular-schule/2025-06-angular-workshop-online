import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, isFormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Book } from '../shared/book';
import { BookStore } from '../shared/book-store';
import { Router } from '@angular/router';

const pwValidator: ValidatorFn = function (control) {
  if(!isFormGroup(control)) {
    return null;
  }

  return control.get('pw1')?.value === control.get('pw1')?.value ? null : { pwerror: true };
}

@Component({
  selector: 'app-book-create-page',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './book-create-page.html',
  styleUrl: './book-create-page.scss'
})
export class BookCreatePage {
  #bookStore = inject(BookStore);
  #router = inject(Router);

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
    /*password: new FormGroup({
      pw1: new FormControl('', { nonNullable: true }),
      pw2: new FormControl('', { nonNullable: true }),
    }, { validators: [pwValidator] })*/
    authors: new FormArray([
      new FormControl('', { nonNullable: true }),
      new FormControl('', { nonNullable: true }),
      new FormControl('', { nonNullable: true }),
    ])
  });

  addAuthorControl() {
    this.bookForm.controls.authors.push(
      new FormControl('', { nonNullable: true })
    )
  }

  setManyAuthors() {
    const array = this.bookForm.controls.authors;
    const requiredLength = 5;
    const rest = requiredLength - array.length;
    for (let i = 0; i < rest; i++) {
      this.addAuthorControl();
    }

    array.patchValue(['A', 'B', 'C', 'D', 'E'])
  }

  isInvalid(c: FormControl): boolean {
    return c.touched && c.invalid;
  }

  hasError(c: FormControl, errorCode: string): boolean {
    return c.hasError(errorCode) && c.touched;
  }

  submitForm() {
    if (this.bookForm.invalid) {
      return;
    }

    const newBook: Book = this.bookForm.getRawValue();

    this.#bookStore.create(newBook).subscribe(receivedBook => {
      this.#router.navigate(['/books', receivedBook.isbn]);
    });
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
