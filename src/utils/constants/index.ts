import routes from './routes';
import endpoints from './endpoints';
import { PropsConfig } from '../interfaces';

export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';

const {
  VITE_API_HOST: API_HOST,
  VITE_APP_NAME: APP_NAME
} = import.meta.env;

const VITE_APP: PropsConfig = {
  API_HOST,
  APP_NAME
}

const TITLE_PAGES = {
  employees: 'Company Employees',
  single: 'Employee Profile'
}

export {
  routes,
  endpoints,
  VITE_APP,
  TITLE_PAGES
}
