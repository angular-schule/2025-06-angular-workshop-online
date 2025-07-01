export interface ExerciseEntry {
  name: string;
  slug: string;
}

export const exercisesList: ExerciseEntry[] = [
  { name: 'Creating Observables', slug: 'creating' },
  { name: 'Window resize: Observables from events', slug: 'fromevent' },
  { name: 'Multicasting with Subjects', slug: 'multicast' },
  { name: 'Error handling', slug: 'errorhandling' },
  { name: 'How to unsubscribe and avoid memory leaks', slug: 'unsubscribe' },
  { name: 'Higher Order Observables with concatMap, mergeMap, switchMap, exhaustMap', slug: 'higherorder' },
  { name: 'Game Score: scan and reduce', slug: 'gamescore' },
  { name: '[EXTRA] Chat: Merging Observables', slug: 'chat' },
  { name: '[EXTRA] Drag and drop', slug: 'dragdrop' },
];
