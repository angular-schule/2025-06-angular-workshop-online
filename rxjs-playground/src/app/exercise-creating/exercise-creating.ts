import { Component } from '@angular/core';
import { Observable, of, from, timer, interval, ReplaySubject, map, filter, Subscriber, Observer } from 'rxjs';

import { HistoryWindow } from '../shared/history-window/history-window';

@Component({
  templateUrl: './exercise-creating.html',
  imports: [HistoryWindow]
})
export class ExerciseCreating {

  logStream$ = new ReplaySubject<unknown>();

  constructor() {
    /**
     * 1. Erstelle ein Observable und abonniere den Datenstrom.
     *    Probiere dazu die verschiedenen Creation Functions aus: of(), from(), timer(), interval()
     * 2. Implementiere außerdem ein Observable manuell, indem du den Konstruktor "new Observable()" nutzt.
     *
     * Tipps:
     * Zum Abonnieren kannst du einen (partiellen) Observer oder ein einzelnes next-Callback verwenden.
     * Du kannst die Methode this.log() verwenden, um eine Ausgabe in der schwarzen Box im Browser zu erzeugen.
     */

    /******************************/



    // of('Köln', 'Stuttgart', 'Leipzig', 'Berlin')
    // from([1,2,3,4,5])
    // interval(1000)         // ---0---1---2---3---4---5 ...
    // timer(2000)            // ------0|
    // timer(3000, 1000)      // ---------0---1---2---3---4---5 ...
    // timer(0, 1000)         // 0---1---2---3---4---5 ...

    timer(0, 1000).pipe(
      map(e => e * 3),
      filter(e => e % 2 === 0)
    ).subscribe({
      next: e => this.log(e),
      complete: () => this.log('COMPLETE')
    });


    /******************************/

    // Producer: Funktion, die Daten generiert
    function producer(sub: Subscriber<number>) {
      const result = Math.random();
      sub.next(result);
      sub.next(10);
      sub.next(20);
      sub.next(30);

      setTimeout(() => sub.next(100), 1000)
      setTimeout(() => sub.next(200), 2000)
      setTimeout(() => sub.complete(), 3000)
    }

    // Observer: empfängt die Daten
    const obs: Observer<number> = {
      next: (e: number) => console.log(e),
      error: (err: any) => console.log('ERROR', err),
      complete: () => console.log('FERTIG')
    };

    // producer(obs);

    // Finnische Notation $
    // Observable: Schnittstelle zwischen Observer und Producer
    const myObs$ = new Observable(producer);

    // Subscription: Vertrag zwischen Observer und Observable
    // myObs$.subscribe(obs);


    const myObs2$ = new Observable<string>(sub => {
      sub.next('Köln');
      sub.next('Stuttgart');
      sub.next('Leipzig');
      sub.next('Berlin');

      sub.complete();
    })


    /******************************/
  }

  log(msg: unknown) {
    this.logStream$.next(msg);
  }

}
