import React, { memo, useEffect, useState, useRef } from 'react';
import { Routes, Route } from "react-router-dom";

import Error from '../../components/Error';

import NavBar from '../../components/Navbars';
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";

import { routes } from '../../utils/constants';
import {
  connect,
  createStructuredSelector,
  compose,
  useInjectReducer,
  useInjectSaga,
} from '../../utils/services';

import {
  makeDataSelector as makeDataSelectorError
} from '../../utils/services/getError/selectors';

import reducerError from '../../utils/services/getError/reducer';

import Container from './styles';
import { Props } from './interface';

import sidebarImage from "../../assets/sidebar-5.jpg";

const App = ({
  error,
}: Props) => {
  useInjectReducer({ key: 'error', reducer: reducerError })

  const [image, setImage] = useState(sidebarImage);
  const [color, setColor] = useState("black");
  const [hasImage, setHasImage] = useState(true);
  const mainPanel = useRef(null);

  useEffect(() => {

  }, [])

  return (
    <Container fluid className="d-flex flex-nowrap p-0">
      <Sidebar color={color} image={hasImage ? image : ""} routes={routes} />

      <div className="main-panel" ref={mainPanel}>
        <NavBar />

        <Container.Content>
          {error && <Error message={error} />}

          <Routes>
            {routes.map(route => (
              <Route path={route.path} index={!route.index} element={route.component} />
            ))}
          </Routes>
        </Container.Content>

        <Footer />
      </div>
    </Container>
  )
};

const mapStateToProps = createStructuredSelector({
  error: makeDataSelectorError()
});

export const mapDispatchToProps = (dispatch: Function) => ({

});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

type IParentProps = {};

export default compose(
  withConnect,
  memo
)(App) as React.FunctionComponent<IParentProps>;
