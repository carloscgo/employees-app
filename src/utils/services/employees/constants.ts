/*
 * employees constants
 */

const scope = 'src/utils/services/employees/';

/** GET_ACTION_REQUEST */
export const GET_ALL_ACTION_REQUEST = `${scope}GET_ALL_ACTION_REQUEST`;
export const GET_ALL_ACTION_SUCCESS = `${scope}GET_ALL_ACTION_SUCCESS`;

/** GET_SINGLE_ACTION_REQUEST */
export const GET_SINGLE_ACTION_REQUEST = `${scope}GET_SINGLE_ACTION_REQUEST`;
export const GET_SINGLE_ACTION_SUCCESS = `${scope}GET_SINGLE_ACTION_SUCCESS`;

/** ADD_ACTION_REQUEST */
export const ADD_ACTION_REQUEST = `${scope}ADD_ACTION_REQUEST`;
export const ADD_ACTION_SUCCESS = `${scope}ADD_ACTION_SUCCESS`;

/** UPDATE_ACTION_REQUEST */
export const UPDATE_ACTION_REQUEST = `${scope}UPDATE_ACTION_REQUEST`;
export const UPDATE_ACTION_SUCCESS = `${scope}UPDATE_ACTION_SUCCESS`;

/** DELETE_ACTION_REQUEST */
export const DELETE_ACTION_REQUEST = `${scope}DELETE_ACTION_REQUEST`;
export const DELETE_ACTION_SUCCESS = `${scope}DELETE_ACTION_SUCCESS`;

export const messages = {
  toast: {
    title: 'Success',
    messageUpdate: 'The change was made correctly',
    messageAdd: 'The record was added successfully',
    messageDelete: 'The record deleted successfully'
  }
}