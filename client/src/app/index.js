import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { NavBar } from '../components';

import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1000px;
  margin: 0px auto;
`;

function App() {
  return (
    <Router>
      <NavBar />
      <Container>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path="/" exact component={lazy(() => import('../pages/Home'))} />
            <Route path="/movies/search" exact component={lazy(() => import('../pages/MoviesSearch'))} />
            <Route path="/movies/list" exact component={lazy(() => import('../pages/MoviesList'))} />
            <Route path="/movies/create" exact component={lazy(() => import('../pages/MoviesInsert'))} />
            <Route path="/movies/update/:id" exact component={lazy(() => import('../pages/MoviesUpdate'))} />
          </Switch>
        </Suspense>
      </Container>
    </Router>
  );
}

export default App;