import React from "react";
import { useAuth } from "../Utils/AuthContext.js";
import "./Profile.css"
import defaultavatar from "../assets/icons/defaultavatar.png";
import { Link } from "react-router-dom"

function Profile(){
    
    const auth = useAuth();
    return(
        <div>
            {auth.user ?
            
            <>
            <h1 style={{color: 'black'}}> Profile </h1>
            <h1 style={{color: 'black'}}> Name: {auth.user.profile.name} </h1>
            <h1 style={{color: 'black'}}> E-mail: {auth.user.email} </h1>
            <h1 style={{ color: 'black' }}> Phone Number: {auth.user.profile.phone_number} </h1>
            <h1 style={{color: 'black'}}> Account Type: {auth.user.userType}</h1>
            <h1 style={{color: 'black'}}> Account Creation Date: {auth.user.createdAt} </h1>
                </>: <><h1 style={{color: 'black'}}> Please Log In </h1></>}
        </div>
    );
}

export default Profile;
