import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { NavBar } from '../components';
import ProtectedRoute from '../utils/ProtectedRoute';
import { ProvideAuth } from '../provider/auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1000px;
  margin: 0px auto;
`;

function App() {
  return (
    <ProvideAuth>
      <Router>
        <NavBar />
        <Container>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route path="/" exact component={lazy(() => import('../pages/Home'))} />
              <Route path="/login" exact component={lazy(() => import('../pages/Login'))} />
              <Route path="/join" exact component={lazy(() => import('../pages/Join'))} />
              <ProtectedRoute path="/movies/search" exact component={lazy(() => import('../pages/MoviesSearch'))} />
              <Route path="/movies/list" exact component={lazy(() => import('../pages/MoviesList'))} />
              <ProtectedRoute path="/movies/create" exact component={lazy(() => import('../pages/MoviesInsert'))} />
              <ProtectedRoute path="/logout" exact component={lazy(() => import('../pages/Logout'))} />
            </Switch>
          </Suspense>
        </Container>
      </Router>
    </ProvideAuth>
  );
}

export default App;