import React, { useEffect } from 'react';
import books from '../src/Component/Book_Listing/db';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Component/Book_Listing/Home';
import Details from './Component/Book_Detail_view/Details';
import Add from './Component/Forms/Add';
import Edit from './Component/Forms/Edit';

function App() {
  useEffect(() => {
    // Check if user data is already in localStorage
    if (!localStorage.getItem('user')) {
        localStorage.setItem('user', JSON.stringify(books));
    }
}, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Home/>} path='/' />
          <Route element={<Details/>} path='/details/:id' />
          <Route element={<Add/>} path='/add' />
          <Route element={<Edit/>} path='/edit' />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
