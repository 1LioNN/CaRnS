import React from 'react';
import {useAuth} from '../Utils/AuthContext.js'

function Profile(){
    
    const auth = useAuth();
    return(
        <div>
            {auth.user ?
            <>
            <h1 style={{color: 'black'}}> Profile </h1>
            <h1 style={{color: 'black'}}> E-mail: {auth.user.email} </h1>
            <h1 style={{color: 'black'}}> Account Type: {auth.user.userType}</h1>
            <h1 style={{color: 'black'}}> Account Creation Date: {auth.user.createdAt} </h1>
                </>: <><h1 style={{color: 'black'}}> Please Log In </h1></>}
        </div>
    );
}

export default Profile;