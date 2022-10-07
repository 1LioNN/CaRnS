import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/pages/LandingPage';
import BuyListing from './components/pages/BuyListing';
import RentListing from './components/pages/RentListing';
import SignUp from './components/pages/SignUp';
import SignIn from './components/pages/SignIn';


function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/buy' element={<BuyListing/>}/>
        <Route path='/rent' element={<RentListing/>}/>
        <Route path='/signup' element ={<SignUp/>}/>
        <Route path='/signin' element ={<SignIn/>}/>

      </Routes>
     
    </div>
  );
}
export default App;
