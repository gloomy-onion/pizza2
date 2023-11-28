import './App.module.scss';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import MainContent from './components/MainContent/MainContent';
import MainLayout from './layouts/MainLayout';
import CartPage from './pages/CartPage';
import NotFound from './pages/NotFound';
import PizzaPage from './pages/PizzaPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<MainContent />} />
        <Route path="pizza/:id" element={<PizzaPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
