import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { fromEvent, concatMap, first, takeUntil } from 'rxjs';

@Component({
  templateUrl: './exercise-dragdrop.html',
  styleUrl: './exercise-dragdrop.scss'
})
export class ExerciseDragdrop {

  readonly target = viewChild<ElementRef>('target');

  readonly mouseMove$ = fromEvent<MouseEvent>(document, 'mousemove');
  readonly mouseUp$ = fromEvent<MouseEvent>(document, 'mouseup');
  readonly mouseDown$ = toObservable(this.target).pipe(
    first(e => !!e),
    concatMap(target => fromEvent<MouseEvent>(target.nativeElement, 'mousedown'))
  );

  readonly targetPosition = signal({ x: 100, y: 80 });

  constructor() {
    /**
     * Nutze RxJS, um die rote Box mit Drag-and-drop zu bewegen.
     *
     * Die Methode `setTargetPosition(e: MouseEvent)` ändert die Position der Box.
     * Nutze die Observables `mouseMove$`, `mouseDown$` und `mouseUp$` in einer geeigneten Kombination.
     * Beginne damit, dass die Box am Mauszeiger klebt.
     * Sorge dann dafür, dass dieser Prozess erst beim Klick (`mouseDown$`) beginnt.
     * Beende den Prozess, sobald `mouseUp$` feuert.
     *
     * Zusatz: Erstelle das Signal `targetPosition` mit `toSignal()` direkt aus dem Observable.
     */

    /******************************/

    this.mouseDown$.pipe(
      concatMap(() => this.mouseMove$.pipe(takeUntil(this.mouseUp$)))
    ).subscribe(e => {
      this.setTargetPosition(e);
    })

    /******************************/
  }

  setTargetPosition(event: MouseEvent) {
    this.targetPosition.set({ x: event.pageX, y: event.pageY });
  }

}
