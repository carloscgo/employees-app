import axios from 'axios';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectReducer } from '../injectReducer';
import { useInjectSaga } from '../injectSaga';
import { VITE_APP, routes } from '../constants';

axios.defaults.headers.common['X-RapidAPI-Key'] = VITE_APP.API_KEY;
axios.defaults.headers.common['X-RapidAPI-Host'] = VITE_APP.API_HOST;
axios.defaults.baseURL = `https://${VITE_APP.API_HOST}/`;

const setStorage = (key: string, value: any) => localStorage.setItem(key, JSON.stringify(value));
const getStorage = (key: string, def?: any) => JSON.parse(localStorage.getItem(key) as string) || def;

const searchRoute = (slug: string) => routes.find((route: any) => route.slug === slug)?.path as string

export {
  connect,
  createStructuredSelector,
  compose,
  useInjectReducer,
  useInjectSaga,
  axios,
  setStorage,
  getStorage,
  searchRoute
};