import { createFeature, createReducer, on } from '@ngrx/store';
import { BookActions } from './book.actions';
import { Book } from '../shared/book';

export const bookFeatureKey = 'book';

export interface State {
  books: Book[];
  loading: boolean;
  error: string | null;
}

export const initialState: State = {
  books: [],
  loading: false,
  error: null
};

export const reducer = createReducer(
  initialState,
  on(BookActions.loadBooks, state => {
    return {
      ...state,
      loading: true,
      error: null
    };
  }),

  on(BookActions.loadBooksSuccess, (state, action) => {
    return {
      ...state,
      books: action.data,
      loading: false,
      error: null
    }
  }),

  on(BookActions.loadBooksFailure, (state, action) => {
    return {
      ...state,
      books: [],
      loading: false,
      error: action.error
    };
  }),
);

export const bookFeature = createFeature({
  name: bookFeatureKey,
  reducer,
});

