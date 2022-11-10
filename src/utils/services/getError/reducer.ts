/*
 * getMovies reducer
 */

import produce from 'immer';

import {
  ACTION_ERROR,
  CLEAN_ERROR
} from './constants';

export const initialState = {
  message: null,
}

type ACTION = {
  type: string,
  error: string | null
}
type DRAFT = {
  message: string | null
}

const reducer = (state = initialState, action: ACTION) =>
  produce(state, (draft: DRAFT) => {
    if (action.type === ACTION_ERROR) {
      draft.message = action.error
    }

    if (action.type === CLEAN_ERROR) {
      draft.message = null
    }
  });

export default reducer;
