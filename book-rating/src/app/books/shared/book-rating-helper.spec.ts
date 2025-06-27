import { TestBed } from '@angular/core/testing';

import { BookRatingHelper } from './book-rating-helper';
import { Book } from './book';

describe('BookRatingHelper', () => {
  let service: BookRatingHelper;
  let testBook: Book;

  beforeEach(() => {
    // ARRANGE
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookRatingHelper);

    testBook = {
      isbn: '',
      title: '',
      description: '',
      price: 4,
      rating: 3
    };

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should rate up a book by one', () => {
    // ARRANGE
    testBook.rating = 3;

    // ACT
    const ratedBook = service.rateUp(testBook);

    // ASSERT
    expect(ratedBook.rating).toBe(4); // NICHT: toBe(testBook.rating + 1)
  });

  it('should rate down a book by one', () => {
    testBook.rating = 3;
    const ratedBook = service.rateDown(testBook);
    expect(ratedBook.rating).toBe(2);
  });

  it('should not rate higher than 5', () => {
    testBook.rating = 5;
    const ratedBook = service.rateUp(testBook);
    expect(ratedBook.rating).toBe(5);
  });

  it('should not rate lower than 1', () => {
    testBook.rating = 1;
    const ratedBook = service.rateDown(testBook);
    expect(ratedBook.rating).toBe(1);
  });

});
