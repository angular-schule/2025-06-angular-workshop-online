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

  it('should call service.rateUp() for component.doRateUp()', () => {
    // ARRANGE
    // Service anfordern (das ist eigentlich unser ratingMock)
    const ratingHelper = TestBed.inject(BookRatingHelper);

    // Testbuch
    const testBook = { isbn: '3424' } as Book; // Type Assertion – bitte vorsichtig verwenden!

    // Mock überwachen
    // spyOn(ratingHelper, 'rateUp').and.returnValue(testBook);
    // spyOn(ratingHelper, 'rateUp').and.callFake(b => b);

    // Methode überwachen, aber die originale Methode wird trotzdem
    // verwendet, um den Wert zu erzeugen
    spyOn(ratingHelper, 'rateUp').and.callThrough();

    // ACT
    component.doRateUp(testBook);

    // ASSERT
    // prüfen, ob service.rateUp() aufgerufen wurde
    expect(ratingHelper.rateUp).toHaveBeenCalledOnceWith(testBook);
  });
});
