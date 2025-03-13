import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/Signup';
import NewProfile from './pages/AddProfile';
import DisplayProfiles from './pages/Profiles';
import EditProfile from './pages/EditProfile';
import About from './pages/About';
import EventForm from './pages/CreatingAList';
import AddGift from './pages/ItemAdd';
import ItemDetails from './pages/ItemDetails';
import DisplayEvents from './pages/DisplayLists';
import WishList from './pages/ItemisedList';
import Home from './pages/Home';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/api/auth/login' element={<Login/>}/>
        <Route path='/api/auth/signup' element={<Signup/>}/>
        <Route path='/api/user/add' element={<NewProfile/>}/>
        <Route path='/api/user/' element={<DisplayProfiles />}/>
        <Route path='/api/user/:id' element={<EditProfile />}/>
        <Route path='/api/about' element={<About />}/>
        <Route path='/api/giftlist/event' element={<EventForm />}/>
        <Route path='/api/giftlist/:id/:giftId' element={<ItemDetails />}/>
        <Route path='/api/giftlist/:id/add' element={<AddGift />}/>
        <Route path='/api/giftlist/' element={<DisplayEvents />}/>
        <Route path='/api/giftlist/:id' element={<WishList />}/>
        <Route path='/PresentPals/' element={<Home />}/>
        

      </Routes>
    </BrowserRouter>
  )
}

export default App
