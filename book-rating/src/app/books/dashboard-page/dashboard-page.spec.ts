import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPage } from './dashboard-page';
import { Book } from '../shared/book';
import { BookRatingHelper } from '../shared/book-rating-helper';

describe('DashboardPage', () => {
  let component: DashboardPage;
  let fixture: ComponentFixture<DashboardPage>;

  beforeEach(async () => {

    const ratingMock = {
      rateUp: (b: Book) => b,
      rateDown: (b: Book) => b,
    };

    await TestBed.configureTestingModule({
      imports: [DashboardPage],
      providers: [
        // BRH ersetzen: Immer wenn jemand BRH anfordert,
        // wird stattdessen unser ratingMock ausgeliefert
        { provide: BookRatingHelper, useValue: ratingMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
