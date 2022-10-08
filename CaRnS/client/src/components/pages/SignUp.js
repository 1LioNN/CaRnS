import React from 'react';
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@mui/material'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { FormHelperText } from '@mui/material'
import * as Yup from 'yup'
import {useAuth} from '../../Utils/AuthContext.js'
import { useNavigate } from 'react-router-dom';

const paperStyle = { padding: 20, width: 300, margin: "0 auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const marginTop = { marginTop: 5 }
    const initialValues = {
        name: '',
        email: '',
        account_type: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        termsAndConditions: false
    }
    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3, "It's too short").required("Required"),
        email: Yup.string().email("Enter valid email").required("Required"),
        account_type: Yup.string().oneOf(["buyer", "vendor"], "Required").required("Required"),
        phoneNumber: Yup.number().typeError("Enter valid Phone Number").required('Required'),
        password: Yup.string().min(8, "Password minimum length should be 8").required("Required"),
        confirmPassword: Yup.string().oneOf([Yup.ref('password')], "Password not matched").required("Required"),
        termsAndConditions: Yup.string().oneOf(["true"], "Accept terms & conditions")
    })
/*
const OnSubmit = (values, props) => {
    
    const auth = useAuth();
    const navigate = useNavigate();
    auth.signup({
        email: values.email.trim(),
        password: values.password,
        userType: values.account_type
    }, (res, data)=> {
        if (res === 200) {
            navigate('/signin');
        }
        else {
            
            props.resetForm()
            props.setSubmitting(false)
        }
    });
    console.log(values)
    console.log(props)
    setTimeout(() => {
        
        props.resetForm()
        props.setSubmitting(false)
    }, 2000)
}
*/

function SignUp(){
    let auth = useAuth();
    let navigate = useNavigate();
    const onSubmit = async (data) => {
        console.log(data)
        auth.signup({
            email: data.email.trim(),
            password: data.password,
            userType: data.account_type
        }, (res, data)=> {
            if (res === 200) {
                navigate('/signin');
            }
            else {
                
            }
        });
    };
    
        return(
        <Grid>
        <Paper style={paperStyle}>
            <Grid align='center'>
                <Avatar style={avatarStyle}>
                    <AddCircleOutlineOutlinedIcon />
                </Avatar>
                <h2 style={headerStyle}>Sign Up</h2>
                <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
            </Grid>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {(props) => (
                    <Form>
                    
                    <Field as={TextField} fullWidth name="name" label='Name'
                    placeholder="Enter your name" helperText={<ErrorMessage name="name" />} />
                    <Field as={TextField} fullWidth name="email" label='Email'
                    placeholder="Enter your email" helperText={<ErrorMessage name="email" />} />
                    <FormControl component="fieldset" style={marginTop}>
                    <FormLabel component="legend">Account Type</FormLabel>
                    < Field as={RadioGroup} aria-label="account_type" name="account_type" name2="account_type" style={{ display: 'initial' }}>
                    <FormControlLabel value="vendor" control={<Radio />} label="Sell" />
                    <FormControlLabel value="buyer" control={<Radio />} label="Buy" />
                    </ Field>
                    </FormControl>
                    <FormHelperText><ErrorMessage name="account_type" /></FormHelperText>
                    <Field as={TextField} fullWidth name="phoneNumber" label='Phone Number'
                    placeholder="Enter your phone number" helperText={<ErrorMessage name="phoneNumber" />} />
                    <Field as={TextField} fullWidth name='password' type="password"
                    label='Password' placeholder="Enter your password"
                    helperText={<ErrorMessage name="password" />} />
                    <Field as={TextField} fullWidth name="confirmPassword" type="password"
                    label='Confirm Password' placeholder="Confirm your password"
                    helperText={<ErrorMessage name="confirmPassword" />} />
                    <FormControlLabel
                    control={<Field as={Checkbox} name="termsAndConditions" />}
                    label="I accept the terms and conditions."
                    />
                    <FormHelperText><ErrorMessage name="termsAndConditions" /></FormHelperText>
                    <Button type='submit' variant='contained' disabled={props.isSubmitting}
                    style={{ color: "#fff", backgroundColor: "#e87123", borderRadius: 40}}>{props.isSubmitting ? "Loading" : "Sign up"}</Button>
                    
                    </Form>
                )}
            </Formik>
        </Paper>
    </Grid> 
    );
}

export default SignUp;