import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Login from './pages/Login';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/api/auth/login' element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
