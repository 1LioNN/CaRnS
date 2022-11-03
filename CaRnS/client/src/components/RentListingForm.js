import React, {useState} from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import { useNotification } from '../Utils/NotificationContext';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FilledInput from '@mui/material/FilledInput';
import { Formik, Field, Form, ErrorMessage } from 'formik'


import BasicDateRangePicker from './date-range-picker';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

// This is the page for create a rent listing

const initialValues = {
    image: '',
    listing_name: '',
    vehicle_type: '',
    car_make:'',
    car_model: '',
    car_year: '',
    daily_fee:'',
    location:'',
    start_date:'',
    end_date:''

}


const RentListingForm = () => {

    const { _, setNotification } = useNotification();
    const onSubmit = async (data) => {
        console.log(data)
        let description = data.car_make.concat('-', data.car_model,'-',data.car_year)
        console.log(description)


        const response = await fetch('http://localhost:8000/api/listing/post-rent', {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                listingName: data.listing_name,
                isBuy: false,
                buyListingDetails: {
                    listingDescription: description,
                    vehicleType: data.vehicle_type,
                    rentPrice: data.daily_fee,
                    location: data.location,
                    availabilityStart: data.start_date,
                    availabilityEnd: data.end_date,
                    isActive: true
                }
            })
        });
        const status = response.status;
        console.log(status)
        const resData = await response.json();
        console.log(resData)
        if (status === 200) {
            setNotification({
                message:"Listing successfully posted",
                severity: "success",
                open: true
            });
        }
        else {
            setNotification({
                message:resData.error,
                severity: "error",
                open: true
            });
        }



    };


    const [values, setValues] = React.useState({
        amount: ''
    });

    const [showhide, setShowhide] = useState("Sell");

    const handleshow = e=>{
        const getshow= e.target.value;
        setShowhide(getshow);
    }

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };



    return(


        <Formik
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}
            onSubmit={onSubmit}
            initialValues={initialValues}
        >
            {(props) => (


                <Form>
                    <Container maxWidth="md" >

                        <IconButton size="large">
                            <ArrowBackIcon/>
                        </IconButton>

                        <Typography fontSize={22}>
                            Create New Listing
                        </Typography>

                        <Typography fontSize={17} color='grey'>
                            Upload Image
                        </Typography>

                        <div>
                            <Avatar variant="rounded" src={""} sx={{ width: 150, height: 150 }} />
                            <input type="file" name="image"/>
                            <button >Submit</button>
                        </div>

                        <Box
                            sx={{
                                '& > :not(style)': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <Field as={TextField} name="listing_name" label="listing_name" variant="filled" />
                            <Field as={TextField} name="vehicle_type" label="vehicle_type" variant="filled" />
                            <Field as={TextField} name="location" label="location" variant="filled" />

                        </Box>

                        <Box
                            sx={{
                                '& > :not(style)': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <Field as={TextField} name="car_make" label="car_make" variant="filled" />
                            <Field as={TextField} name="car_model" label="car_model" variant="filled" />
                            <Field as={TextField} name="car_year" label="car_year" variant="filled" />
                        </Box>

                        {/* <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">Listing Type</FormLabel>
                  <Field as={RadioGroup}
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="listing-type"
                  >
                      <FormControlLabel value="sell" control={<Radio />} label="Sell" checked={showhide==='Sell'} onClick={handleshow} />
                      <FormControlLabel value="rent" control={<Radio />} label="Rent" onClick={handleshow}/>
                  </Field>
              </FormControl>

              {showhide==='Sell' &&(
                <Typography fontSize={17}>
                  Listing Price
              </Typography>
              )
              }

              {showhide==='Rent' &&(
                <Typography fontSize={17}>
                  <BasicDateRangePicker />
                  Listing Price (per day)
                  </Typography>
              )
              } */}

                        <FormControl fullWidth sx={{ m: 0 }} variant="filled">
                            <InputLabel htmlFor="filled-adornment-amount">Price per day</InputLabel>
                            <Field as={FilledInput}
                                   name="amount"
                                // value={values.amount}
                                // onChange={handleChange('amount')}
                                   startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            />
                        </FormControl>

                        <Typography fontSize={17} color='grey'>
                            Select start and end Date
                        </Typography>

                        <div>
                            <BasicDateRangePicker>

                            </BasicDateRangePicker>
                        </div>


                        <Button type='submit' variant='contained' onSubmit={onSubmit} sx={{ m: 2 }}
                                style={{ color: "#fff", backgroundColor: "#e87123", borderRadius: 40}}>
                            Create New Listing
                        </Button>


                    </Container>
                </Form>
            )}
        </Formik>

    )
}

export default RentListingForm;