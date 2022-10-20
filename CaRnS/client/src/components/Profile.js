import React from 'react';
import {useAuth} from '../Utils/AuthContext.js'
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from 'react-router-dom';

function Profile(){
    let auth = useAuth();
    let navigate = useNavigate();
    const onClick = async () => {
        auth.logout((res, data)=> {
            if (res === 200) {
                navigate('/');
            }
            else {
                
            }
        });
    };
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
            <Typography align='center'>
                <Button
                className="btn"
                style={{
                    borderRadius: 40,
                    backgroundColor: "#e87123",
                    padding: "8px 30px",
                    fontSize: "18px",
                    color: "#fff"
                }}
                variant="contained"
                disableElevation
                onClick={onClick}
                >
                Log Out
                </Button>
                </Typography>
            
                </>: <><h1 style={{color: 'black'}}> Please Log In </h1></>}
        </div>
    );
}

export default Profile;