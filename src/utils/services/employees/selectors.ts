import { createSelector } from 'reselect';

import { initialState } from './reducer';

import { getStorage } from '..';

/**
 * Direct selector to the employees state domain
 */
type STATE = {
  employees: {
    loading: boolean | null,
    data: Array<any>,
  }
}

export const selectDomain = (state: STATE) => state.employees || initialState;

/**
 * @function makeDataSelector
 * @return {string} data from state
 */
export const makeDataSelector: any = () =>
  createSelector(
    selectDomain,
    substate => ({
      ...substate,
      data: getStorage('employees') || substate.data
    })
  );