import routes from './routes';

export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';

const {
  VITE_API_HOST: API_HOST,
  VITE_API_KEY: API_KEY,
  VITE_APP_NAME: APP_NAME
} = import.meta.env;

const VITE_APP: any = {
  API_HOST,
  API_KEY,
  APP_NAME
};

export {
  routes,
  VITE_APP
};
