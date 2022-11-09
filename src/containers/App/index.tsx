import React, { memo, useEffect, useState, useRef } from 'react';
import { Routes, Route } from "react-router-dom";
import get from "lodash/get";

import Error from '../../components/Error';

import NavBar from '../../components/Navbars';
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
import Loading from "../../components/Loading";

import { routes } from '../../utils/constants';
import {
  connect,
  createStructuredSelector,
  compose,
  useInjectReducer,
  useInjectSaga,
} from '../../utils/services';
import Context from '../../utils/context';

import {
  makeDataSelector as makeDataSelectorError
} from '../../utils/services/getError/selectors';
import {
  makeDataSelector as makeDataSelectorEmployees
} from '../../utils/services/employees/selectors';
import reducerError from '../../utils/services/getError/reducer';
import reducerEmployees from '../../utils/services/employees/reducer';
import sagaEmployees from '../../utils/services/employees/saga';
import {
  getAllRequestAction,
  deleteRequestAction
} from '../../utils/services/employees/actions';

import Container from './styles';
import {
  PropsApp, PropsRoute, IFunc, IPaginate
} from '../../utils/interfaces';

import sidebarImage from "../../assets/sidebar-5.jpg";

const PAGE = {
  limit: 8,
  skip: 0
}

const App = ({
  error,
  employees,
  getAllRequestActionHandler,
  deleteRequestActionHandler,
}: PropsApp) => {
  useInjectReducer({ key: 'error', reducer: reducerError })
  useInjectReducer({ key: 'employees', reducer: reducerEmployees })
  useInjectSaga({ key: 'employees', saga: sagaEmployees })

  const [currentPage, setCurrentPage] = useState(1);
  const mainPanel = useRef(null);

  useEffect(() => {
    getAllRequestActionHandler(PAGE)
  }, [])

  const loading = get(employees, 'loading', true)
  const data = get(employees, 'data', [])
  const paginate = get(employees, 'paginate', {
    ...PAGE,
    total: 0
  })

  return (
    <Context.Provider
      value={{
        employees: data,
        paginate,
        onLoad: () => {
          getAllRequestActionHandler({ ...PAGE, skip: paginate.limit * currentPage })

          setCurrentPage(state => state + 1)
        },
        onDelete: (id: number) => deleteRequestActionHandler(id),
        onSave: (e: any) => console.log(e)
      }}>
      <Container fluid className="d-flex flex-nowrap p-0">
        <Sidebar color="black" image={sidebarImage} routes={routes} />

        <div className="main-panel" ref={mainPanel}>
          <NavBar />

          <Container.Content className={`${loading ? 'p-0' : ''}`}>
            {error && <Error message={error} />}

            <Loading show={loading} />

            {!loading &&
              <Routes>
                {routes.map((route: PropsRoute, index: number) => (
                  <Route key={index} path={route.path} index={!route.index} element={route.component} />
                ))}
              </Routes>
            }
          </Container.Content>

          <Footer />
        </div>
      </Container>
    </Context.Provider>
  )
}

const mapStateToProps = createStructuredSelector({
  error: makeDataSelectorError(),
  employees: makeDataSelectorEmployees()
});

export const mapDispatchToProps = (dispatch: IFunc) => ({
  getAllRequestActionHandler: (data: IPaginate) => dispatch(getAllRequestAction(data)),
  deleteRequestActionHandler: (id: number) => dispatch(deleteRequestAction(id))
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  memo
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
)(App) as React.FunctionComponent<any>;
