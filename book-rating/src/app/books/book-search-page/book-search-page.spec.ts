import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookSearchPage } from './book-search-page';

describe('BookSearchPage', () => {
  let component: BookSearchPage;
  let fixture: ComponentFixture<BookSearchPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookSearchPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
