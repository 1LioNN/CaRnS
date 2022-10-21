import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/pages/LandingPage';
import BuyListing from './components/pages/BuyListing';
import RentListing from './components/pages/RentListing';
import SignUpPage from './components/pages/SignUpPage';
import SignInPage from './components/pages/SignInPage';
import BuyDetail from './components/pages/BuyDetail';
import ProfilePage from './components/pages/ProfilePage';
import VendorListingsPage from './components/pages/VendorListingsPage';
import EditProfilePage from './components/pages/EditProfilePage';
import { useAuth } from "./Utils/AuthContext";
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function App() {
  let auth = useAuth();
  let navigate  = useNavigate();
  let location = useLocation();
  
  useEffect( () => {
    auth.isauthenticated( (status, data) => {
      if (status !== 200) {
        return <Navigate to="/signin" replace />
      }
      else {
        navigate(location.pathname);
      }
    })
  }, []);
  return (
    <div className="App">
      <Navbar />
      <Routes>
    <Route path='/' element={<LandingPage/>}/>
    <Route path='/signup' element ={<SignUpPage/>}/>
    <Route path='/signin' element ={<SignInPage/>}/>
        <Route path='/buy' element={<BuyListing/>}/>
        <Route path='/rent' element={<RentListing/>}/>
        <Route path='/signup' element ={<SignUpPage/>}/>
        <Route path='/signin' element ={<SignInPage/>}/>
        <Route path='/profile' element ={<ProfilePage/>}/>
        <Route path='/editprofile' element ={<EditProfilePage/>}/>
        <Route path='/listings' element ={<VendorListingsPage/>}/>
        <Route path='/buydetail/:listId' element ={<BuyDetail/>}/>
      </Routes>
     
    </div>
  );
}
export default App;
