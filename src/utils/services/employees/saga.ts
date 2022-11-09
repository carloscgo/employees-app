/**
 * sagas
 */

import { all, put, takeLatest } from 'redux-saga/effects';

import { axios } from '..';

/** ACTIONS */
import {
  getAllSuccessAction,
} from './actions';
import {
  getErrorAction,
} from '../getError/actions';

/** CONSTANTS */
import { GET_ALL_ACTION_REQUEST } from './constants';
import { mapError } from '../index';
import {
  IPaginate
} from '../../interfaces';
import {
  endpoints
} from '../../constants';

interface Paginate extends IPaginate {
  type: string
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
 * @function watchGenresAction
 * @yields getAll
 */
export function* watchEmployeesAction() {
  yield takeLatest(GET_ALL_ACTION_REQUEST, getAll)
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
