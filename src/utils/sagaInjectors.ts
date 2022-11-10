/* eslint-disable @typescript-eslint/no-explicit-any */
import invariant from 'invariant';
import { isEmpty, isFunction, isString, conformsTo } from 'lodash';
import { DAEMON, ONCE_TILL_UNMOUNT, RESTART_ON_REMOUNT } from './constants';

const allowedModes = [RESTART_ON_REMOUNT, DAEMON, ONCE_TILL_UNMOUNT];

const checkKey = (key: any) =>
  invariant(
    isString(key) && !isEmpty(key),
    '(src/utils...) injectSaga: Expected `key` to be a non empty string'
  );

const checkDescriptor = (descriptor: any) => {
  const shape: any = {
    saga: isFunction,
    mode: (mode: any) => isString(mode) && allowedModes.includes(mode)
  }
  invariant(
    conformsTo(descriptor, shape),
    '(src/utils...) injectSaga: Expected a valid saga descriptor'
  )
}

/**
 * Inject saga favtory
 *
 * @param {*} store - Store
 * @return {any} any
 */
export function injectSagaFactory(store: any) {
  return function injectSaga(key: any, descriptor: any = {}, args: any = undefined) {
    const newDescriptor = {
      ...descriptor,
      mode: descriptor.mode || DAEMON
    }
    const { saga, mode }: any = newDescriptor

    checkKey(key)
    checkDescriptor(newDescriptor)

    let hasSaga = Reflect.has(store.injectedSagas, key)

    if (process.env.NODE_ENV !== 'production') {
      const oldDescriptor = store.injectedSagas[`${key}`]
      // enable hot reloading of daemon and once-till-unmount sagas
      if (hasSaga && oldDescriptor.saga !== saga) {
        oldDescriptor.task.cancel()
        hasSaga = false
      }
    }

    if (
      !hasSaga ||
      (hasSaga && mode !== DAEMON && mode !== ONCE_TILL_UNMOUNT)
    ) {
      /* eslint-disable no-param-reassign */
      store.injectedSagas[`${key}`] = {
        ...newDescriptor,
        task: store.runSaga(saga, args)
      }
      /* eslint-enable no-param-reassign */
    }
  }
}

/**
 * eject saga
 *
 * @param {object} store - store
 * @return {object} is valid
 */
export function ejectSagaFactory(store: any) {
  return function ejectSaga(key: any) {
    checkKey(key)

    if (Reflect.has(store.injectedSagas, key)) {
      const descriptor = store.injectedSagas[`${key}`]
      if (descriptor.mode && descriptor.mode !== DAEMON) {
        descriptor.task.cancel()
        // Clean up in production; in development we need `descriptor.saga` for hot reloading
        if (process.env.NODE_ENV === 'production') {
          // Need some value to be able to detect `ONCE_TILL_UNMOUNT` sagas in `injectSaga`
          store.injectedSagas[`${key}`] = 'done' // eslint-disable-line no-param-reassign
        }
      }
    }
  }
}

/**
 * Get injectors
 *
 * @param {*} store stores
 * @return {object} object
 */
export default function getInjectors(store: any) {
  return {
    injectSaga: injectSagaFactory(store),
    ejectSaga: ejectSagaFactory(store)
  }
}
