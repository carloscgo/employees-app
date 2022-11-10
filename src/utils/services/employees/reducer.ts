/*
 * employees reducer
 */

import produce from 'immer';
import uniqBy from 'lodash/uniqBy';
import remove from 'lodash/remove';

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
  ACTION_ERROR
} from '../getError/constants';
import {
  PropsEmployee,
  Paginate
} from '../../interfaces';
import {
  setStorage
} from '..';

export const initialState = {
  loading: false,
  data: [],
  paginate: {
    limit: 10,
    skip: 0,
    total: 0
  },
  message: null
}

type ACTION = {
  type: string,
  list: Array<PropsEmployee>,
  single: PropsEmployee,
  id: number,
  paginate: Paginate,
  message: string,
}
type DRAFT = {
  loading: boolean,
  data: Array<PropsEmployee>,
  paginate?: Paginate,
  message: string | null,
}

const removeEmployee = (list: Array<PropsEmployee>, id: number) => {
  remove(list, (item) => item.id === id)

  return list
}

const updateEmployee = (list: Array<PropsEmployee>, user: PropsEmployee) => {
  removeEmployee(list, user.id)

  return [...list, user]
}

const reducer = (state = initialState, action: ACTION) =>
  produce(state, (draft: DRAFT) => {
    switch (action.type) {
      case GET_ALL_ACTION_REQUEST:
      case GET_SINGLE_ACTION_REQUEST:
      case ADD_ACTION_REQUEST:
      case UPDATE_ACTION_REQUEST:
      case DELETE_ACTION_REQUEST:
        draft.loading = true
        draft.message = null
        break

      case GET_ALL_ACTION_SUCCESS:
        draft.loading = false
        draft.paginate = action.paginate
        draft.data = uniqBy([
          ...state.data,
          ...action.list
        ], 'email')

        setStorage('employees', draft.data)
        break

      case GET_SINGLE_ACTION_SUCCESS:
      case ADD_ACTION_SUCCESS:
        draft.loading = false
        draft.data = uniqBy([
          ...state.data,
          action.single
        ], 'id')
        draft.message = action.message

        setStorage('employees', draft.data)
        break

      case UPDATE_ACTION_SUCCESS:
        draft.loading = false
        draft.data = updateEmployee(draft.data, action.single)
        draft.message = action.message

        setStorage('employees', draft.data)
        break

      case DELETE_ACTION_SUCCESS:
        draft.loading = false
        draft.data = removeEmployee(draft.data, action.id)
        draft.message = action.message

        setStorage('employees', draft.data)
        break

      case ACTION_ERROR:
        draft.loading = false
        break

      default:
        return initialState
    }
  });

export default reducer;
