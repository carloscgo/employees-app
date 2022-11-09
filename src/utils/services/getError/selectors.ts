import { createSelector } from 'reselect';

import { initialState } from './reducer';

/**
 * Direct selector to the error state domain
 */

type STATE = {
  error: {
    message: string | null
  }
}

export const selectDomain = (state: STATE) => state.error || initialState;

/**
 * @function makeDataSelector
 * @return {string} data from state
 */
export const makeDataSelector = () =>
  createSelector(
    selectDomain,
    substate => substate.message
  );
