import './App.module.scss';
import {Route, Routes} from 'react-router-dom';
import NotFound from './pages/NotFound';
import CartPage from './pages/CartPage';
import FullPizza from './pages/FullPizza';
import MainLayout from './layouts/MainLayout';
import MainContent from './components/MainContent/MainContent';


function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout/>}>
        <Route path="" element={<MainContent/>}/>
        <Route path="pizza/:id" element={<FullPizza/>}/>
        <Route path="cart" element={<CartPage/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Route>
    </Routes>
  );
}

export default App;
