import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/Signup';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/api/auth/login' element={<Login/>}/>
        <Route path='/api/auth/signup' element={<Signup/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
