/* eslint-disable @typescript-eslint/no-explicit-any */
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
  addSuccessAction,
} from './actions';
import {
  getErrorAction,
} from '../getError/actions';

/** CONSTANTS */
import {
  GET_ALL_ACTION_REQUEST,
  DELETE_ACTION_REQUEST,
  UPDATE_ACTION_REQUEST,
  ADD_ACTION_REQUEST,
  messages
} from './constants';
import { mapError } from '../index';
import {
  IPaginate, IEmployee, PropsEmployee
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

const mapFields = (user: PropsEmployee) => ({
  'id': user.id,
  'firstName': user.firstName,
  'lastName': user.lastName,
  'age': user.age,
  'gender': user.gender,
  'email': user.email,
  'image': user.image
})

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

    yield put(deleteSuccessAction(id, messages.toast.messageDelete))
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
      data: {
        ...data,
        image: `https://i.pravatar.cc/150?u=${data.email}`
      }
    })

    yield put(updateSuccessAction(mapFields({ id, ...data } as PropsEmployee), messages.toast.messageUpdate))
  } catch (err: unknown) {
    yield put(getErrorAction(mapError(err) as string))
  }
}

/**
 * @function addEmployee
 * @yields addSuccessAction / getErrorAction
 */
export function* addEmployee({ data }: { data: IEmployee }) {
  try {
    const user: PropsEmployee = yield axios({
      method: endpoints.add.method,
      url: endpoints.add.path,
      data: {
        ...data,
        image: `https://i.pravatar.cc/150?u=${data.email}`
      }
    }).then((response: any) => response.data)

    yield put(addSuccessAction(mapFields(user), messages.toast.messageAdd))
  } catch (err: unknown) {
    yield put(getErrorAction(mapError(err) as string))
  }
}

/**
 * @function watchGetEmployeesAction
 * @yields
 */
export function* watchGetEmployeesAction() {
  yield takeLatest(GET_ALL_ACTION_REQUEST as any, getAll)
}

/**
 * @function watchDeleteEmployeesAction
 * @yields
 */
export function* watchDeleteEmployeesAction() {
  yield takeLatest(DELETE_ACTION_REQUEST as any, deleteEmployee)
}

/**
 * @function watchUpdateEmployeesAction
 * @yields
 */
export function* watchUpdateEmployeesAction() {
  yield takeLatest(UPDATE_ACTION_REQUEST as any, updateEmployee)
}

/**
 * @function watchAddEmployeesAction
 * @yields
 */
export function* watchAddEmployeesAction() {
  yield takeLatest(ADD_ACTION_REQUEST as any, addEmployee)
}
/**
 * @function saga
 * @yields all actions required
 */
export default function* saga() {
  yield all([
    watchGetEmployeesAction(),
    watchDeleteEmployeesAction(),
    watchUpdateEmployeesAction(),
    watchAddEmployeesAction()
  ])
}
