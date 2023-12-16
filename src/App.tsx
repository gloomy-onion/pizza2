import './App.module.scss';
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import MainContent from './components/MainContent/MainContent';
import MainLayout from './layouts/MainLayout';

const CartPage = React.lazy(() => import(/* webpackChunkName: 'Cart' */ './pages/CartPage'));
const NotFound = React.lazy(() => import(/* webpackChunkName: 'NotFound' */ './pages/NotFound'));
const PizzaPage = React.lazy(() => import(/* webpackChunkName: 'PizzaPage' */ './pages/PizzaPage'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<MainContent />} />
        <Route
          path="pizza/:id"
          element={
            <Suspense fallback={<div>Идёт загрузка...</div>}>
              <PizzaPage />
            </Suspense>
          }
        />
        <Route
          path="cart"
          element={
            <Suspense fallback={<div>Идёт загрузка...</div>}>
              <CartPage />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Идёт загрузка...</div>}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
