import './App.module.scss';
import Header from './Header/Header';
import styles from './App.module.scss';
import Home from './pages/Home';
import {Route, Routes} from 'react-router-dom';
import NotFound from './pages/NotFound';
import CartPage from './pages/CartPage';
import {createContext, useState} from 'react';

export const SearchContext = createContext({});

function App() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <body>
    <div className={styles.wrapper}>
      <SearchContext.Provider value={{searchValue, setSearchValue}}>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/cart" element={<CartPage/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </SearchContext.Provider>
    </div>
    </body>
  );
}

export default App;
