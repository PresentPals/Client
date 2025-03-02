import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/Signup';
import NewProfile from './pages/AddProfile';
import DisplayProfiles from './pages/Profiles';
import EditProfile from './pages/EditProfile';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/api/auth/login' element={<Login/>}/>
        <Route path='/api/auth/signup' element={<Signup/>}/>
        <Route path='/api/user/' element={<DisplayProfiles/>}/>
        <Route path='/api/user/add' element={<NewProfile/>}/>
        <Route path='/api/user/:id' element={<EditProfile />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
