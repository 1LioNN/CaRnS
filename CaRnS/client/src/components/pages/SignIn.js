import React from 'react'
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const paperStyle = { padding: 20, height: '73vh', width: 300, margin: "0 auto" }
const avatarStyle = { backgroundColor: '#1bbd7e' }
// const btnstyle = { margin: '8px 0' }
const initialValues = { 
    username: '',
    password: '',
    remember: false
}
const validationSchema = Yup.object().shape({
    username: Yup.string().email('please enter valid email').required("Required"),
    password: Yup.string().required("Required")
})
const onSubmit = (values, props) => {
    console.log(values)
    setTimeout(() => {
        props.resetForm()
        props.setSubmitting(false)
    }, 2000)

}

function SignIn({ handleChange }){
    return(  <Grid>
        <Paper style={paperStyle}>
            <Grid align='center'>
                <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                <h2>Sign In</h2>
            </Grid>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                {(props) => (
                    <Form>
                        <Field as={TextField} label='Username' name="username"
                            placeholder='Enter username' fullWidth required
                            helperText={<ErrorMessage name="username" />}
                        />
                        <Field as={TextField} label='Password' name="password"
                            placeholder='Enter password' type='password' fullWidth required
                            helperText={<ErrorMessage name="password" />} />
                        <Field as={FormControlLabel}
                            name='remember'
                            control={
                                <Checkbox
                                    color="primary"
                                />
                            }
                            label="Remember me"
                        />
                        <Button type='submit' color='primary' variant="contained" disabled={props.isSubmitting}
                            style={{ color: "#fff", backgroundColor: "#e87123", borderRadius: 40}} fullWidth>{props.isSubmitting ? "Loading" : "Sign in"}</Button>

                    </Form>
                )}
            </Formik>
           
            <Typography > Do you have an account ?
                 <Link href="#" onClick={() => handleChange("event", 1)} >
                    Sign Up
            </Link>
            </Typography>
        </Paper>
    </Grid>
);
}

export default SignIn;