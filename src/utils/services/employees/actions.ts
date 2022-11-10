

/*
 * getGenres actions
 */

import {
  GET_ALL_ACTION_REQUEST,
  GET_ALL_ACTION_SUCCESS,
  GET_SINGLE_ACTION_REQUEST,
  GET_SINGLE_ACTION_SUCCESS,
  ADD_ACTION_REQUEST,
  ADD_ACTION_SUCCESS,
  UPDATE_ACTION_REQUEST,
  UPDATE_ACTION_SUCCESS,
  DELETE_ACTION_REQUEST,
  DELETE_ACTION_SUCCESS,
} from './constants';
import {
  PropsEmployee, IEmployee, IPaginate, Paginate
} from '../../interfaces';

/**
 * @function getAllRequestAction
 * @param {IPaginate} paginate - Paginate
 * @param {number} paginate.limit - Limit
 * @param {number} paginate.skip - Skip
 * @return {object} { type, limit, skip }
 */
export const getAllRequestAction = ({ limit, skip }: IPaginate) => ({
  type: GET_ALL_ACTION_REQUEST,
  limit,
  skip
});

/**
 * @function getAllSuccessAction
 * @param {Array<IEmployee>} list - Employees
 * @param {Paginate} paginate - Paginate
 * @return {object} { type, data }
 */
export const getAllSuccessAction = (list: Array<PropsEmployee>, paginate: Paginate) => ({
  type: GET_ALL_ACTION_SUCCESS,
  list,
  paginate
});

/**
 * @function getSingleRequestAction
 * @param {number} id - Employee ID
 * @return {object} { type, id }
 */
export const getSingleRequestAction = (id: number) => ({
  type: GET_SINGLE_ACTION_REQUEST,
  id
});

/**
 * @function getSingleSuccessAction
 * @param {PropsEmployee} single - Employee
 * @return {object} { type, data }
 */
export const getSingleSuccessAction = (single: PropsEmployee) => ({
  type: GET_SINGLE_ACTION_SUCCESS,
  single
});

/**
 * @function addRequestAction
 * @param {IEmployee} data - Employee
 * @return {object} { type }
 */
export const addRequestAction = (data: IEmployee) => ({
  type: ADD_ACTION_REQUEST,
  data
});

/**
 * @function addSuccessAction
 * @param {PropsEmployee} single - Employee
 * @param {string} message - Message
 * @return {object} { type, single }
 */
export const addSuccessAction = (single: PropsEmployee, message: string) => ({
  type: ADD_ACTION_SUCCESS,
  single,
  message
});

/**
 * @function updateRequestAction
 * @param {number} id - Employee ID
 * @param {IEmployee} data - Employee
 * @return {object} { type, data }
 */
export const updateRequestAction = (id: number, data: IEmployee) => ({
  type: UPDATE_ACTION_REQUEST,
  id,
  data
});

/**
 * @function updateSuccessAction
 * @param {PropsEmployee} single - Employees
 * @param {string} message - Message
 * @return {object} { type, data }
 */
export const updateSuccessAction = (single: PropsEmployee, message: string) => ({
  type: UPDATE_ACTION_SUCCESS,
  single,
  message
});

/**
 * @function deleteRequestAction
 * @param {number} id - Employee ID
 * @return {object} { type, id }
 */
export const deleteRequestAction = (id: number) => ({
  type: DELETE_ACTION_REQUEST,
  id
});

/**
 * @function deleteSuccessAction
 * @param {number} id - Employee ID
 * @param {string} message - Message
 * @return {object} { type, id }
 */
export const deleteSuccessAction = (id: number, message: string) => ({
  type: DELETE_ACTION_SUCCESS,
  id,
  message
});
