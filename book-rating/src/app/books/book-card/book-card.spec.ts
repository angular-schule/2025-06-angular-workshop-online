import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCard } from './book-card';

describe('BookCard', () => {
  let component: BookCard;
  let fixture: ComponentFixture<BookCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookCard);

    // (Required) Input setzen
    fixture.componentRef.setInput('book', {
      isbn: '',
      title: '',
      description: '',
      rating: 5,
      price: 100
    });

    component = fixture.componentInstance;
    // Zugriff auf DOM-Element
    // fixture.nativeElement.querySelector()
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

