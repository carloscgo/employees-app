/*
 * getError actions
 */

import {
  ACTION_ERROR,
  CLEAN_ERROR
} from './constants';

/**
 * @function getErrorAction
 * @param {string} error - error
 * @return {object} { type, error }
 */
export const getErrorAction = (error: string) => ({
  type: ACTION_ERROR,
  error
});

/**
 * @function cleanErrorAction
 * @return {object} { type }
 */
export const cleanErrorAction = () => ({
  type: CLEAN_ERROR
});
