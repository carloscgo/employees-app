import { createSelector } from 'reselect';

import { initialState } from './reducer';

/**
 * Direct selector to the error state domain
 */

export const selectDomain = (state: any) => state.error || initialState;

/**
 * @function makeDataSelector
 * @return {string} data from state
 */
export const makeDataSelector = () =>
  createSelector(
    selectDomain,
    substate => substate.message
  );
