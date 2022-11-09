/**
 * sagas
 */

import { all, put, takeLatest } from 'redux-saga/effects';

import { axios } from '..';

/** ACTIONS */
import {
  getAllSuccessAction,
  deleteSuccessAction,
  updateSuccessAction,
} from './actions';
import {
  getErrorAction,
} from '../getError/actions';

/** CONSTANTS */
import {
  GET_ALL_ACTION_REQUEST,
  DELETE_ACTION_REQUEST,
  UPDATE_ACTION_REQUEST,
} from './constants';
import { mapError } from '../index';
import {
  IPaginate, IEmployee
} from '../../interfaces';
import {
  endpoints
} from '../../constants';

interface Paginate extends IPaginate {
  type: string
}

type ID = {
  id: number
}

type Data = {
  id: number,
  data: IEmployee
}

/**
 * @function getAll
 * @yields getAllSuccessAction / getErrorAction
 */
export function* getAll({ limit, skip }: Paginate) {
  try {
    const { users, limit: limitP, skip: skipP, total } = yield axios({
      method: endpoints.list.method,
      url: endpoints.list.path,
      params: {
        limit, skip
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }).then((response: any) => response.data)

    yield put(getAllSuccessAction(users, {
      limit: limitP, skip: skipP, total
    }))
  } catch (err: unknown) {
    yield put(getErrorAction(mapError(err) as string))
  }
}

/**
 * @function deleteEmployee
 * @yields deleteSuccessAction / getErrorAction
 */
export function* deleteEmployee({ id }: ID) {
  try {
    yield axios({
      method: endpoints.delete.method,
      url: endpoints.delete.path.replace(':id', id.toString())
    })

    yield put(deleteSuccessAction(id))
  } catch (err: unknown) {
    yield put(getErrorAction(mapError(err) as string))
  }
}

/**
 * @function updateEmployee
 * @yields updateSuccessAction / getErrorAction
 */
export function* updateEmployee({ id, data }: Data) {
  try {
    yield axios({
      method: endpoints.update.method,
      url: endpoints.update.path.replace(':id', id.toString()),
      data
    })

    yield put(updateSuccessAction({ id, ...data }))
  } catch (err: unknown) {
    yield put(getErrorAction(mapError(err) as string))
  }
}

/**
 * @function watchEmployeesAction
 * @yields
 */
export function* watchEmployeesAction() {
  yield takeLatest(GET_ALL_ACTION_REQUEST, getAll)
  yield takeLatest(DELETE_ACTION_REQUEST, deleteEmployee)
  yield takeLatest(UPDATE_ACTION_REQUEST, updateEmployee)
}

/**
 * @function saga
 * @yields all actions required
 */
export default function* saga() {
  yield all([
    watchEmployeesAction(),
  ])
}
