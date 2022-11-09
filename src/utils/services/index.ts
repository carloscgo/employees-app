/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectReducer } from '../injectReducer';
import { useInjectSaga } from '../injectSaga';
import { VITE_APP, routes } from '../constants';

axios.defaults.baseURL = `https://${VITE_APP.API_HOST}/`;

const setStorage = (key: string, value: any) => localStorage.setItem(key, JSON.stringify(value));
const getStorage = (key: string, def?: any) => JSON.parse(localStorage.getItem(key) as string) || def;

const searchRoute = (slug: string) => routes.find((route: any) => route.slug === slug)?.path as string

const mapError = (e: unknown) => {
  if (typeof e === "string") {
    return e.toUpperCase()
  } else if (e instanceof Error) {
    return e.message
  }
}

const newID = () => {
  const id = parseInt(getStorage('ID', 10000)) + 1

  setStorage('ID', id)

  return id
}

export {
  connect,
  createStructuredSelector,
  compose,
  useInjectReducer,
  useInjectSaga,
  axios,
  setStorage,
  getStorage,
  searchRoute,
  mapError,
  newID
}