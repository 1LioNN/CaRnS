import React, {useEffect, useState} from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import { useNotification } from '../Utils/NotificationContext';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import FilledInput from '@mui/material/FilledInput';
import { Formik, Field, Form, ErrorMessage } from 'formik'


import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const initialValues = {
  address: '',
  card_number: '',
  card_holder:'',
  expiry_date: '',
  cvc: ''

}


const RentCheckout = () => {
    const params = useParams()
    const [rentListing, setRentListing] = useState(null);

    useEffect(() => {
        const url = 'http://localhost:8000/api/listing/view-detail-rent/'+ params.listId;
		const fetchRentDetail = async () => {
			const response = await fetch(url, {
				method: 'GET',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			
			const data = await response.json()
            
            if (response.ok) {
                setRentListing(data)
            }
        }
        fetchRentDetail()
    }, [])
    

    // const { _, setNotification } = useNotification();
    const onSubmit = async (data) => {}
    // console.log(data)
     //   let description = data.car_make.concat('-', data.car_model,'-',data.car_year)
     //   console.log(description) 


  //   const response = await fetch('http://localhost:8000/api/listing/post-buy', {
  //     method: 'POST',
  //     mode: 'cors',
  //     credentials: 'include',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       listingName: data.listing_name,
  //       isBuy: true,
  //       buyListingDetails: {
  //         listingDescription: description,
  //         vehicleType: data.vehicle_type,
  //         salePrice: data.amount,
  //         location: data.location,
  //         isActive: true
  //       }
  //     })
  //   });
  //   const status = response.status;
  //   console.log(status)
  //   const resData = await response.json();
  //   console.log(resData)
  // if (status === 200) {
  //   setNotification({
  //     message:"Listing successfully posted",
  //     severity: "success",
  //     open: true
  //   });
  // }
  // else {
  //   setNotification({
  //     message:resData.error,
  //     severity: "error",
  //     open: true
  //   });
  // }

    


    // const [values, setValues] = React.useState({
    //     amount: ''
    //   });

    // const [showhide, setShowhide] = useState("Sell");

    // const handleshow = e=>{
    //   const getshow= e.target.value;
    //   setShowhide(getshow);
    // }

    // const handleChange = (prop) => (event) => {
    //     setValues({ ...values, [prop]: event.target.value });
    //   };

  const [value, setValue] = React.useState('cash');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const [values, setValues] = React.useState({
    address: ''
  });

  let history = useNavigate();



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
          
              <IconButton size="large" onClick={() => history.goBack()}>
                  <ArrowBackIcon/>
              </IconButton>

              <Typography fontSize={22}>
                  Booking Details 
              </Typography>

              {/* <Typography fontSize={17} color='grey'>
                  Date
              </Typography> */}


              <Typography fontSize={17} color='grey'>
                  Address
              </Typography>

              <FormControl fullWidth sx={{ m: 0 }} variant="filled">
                <InputLabel htmlFor="standard-adornment-address"></InputLabel>
                <Field as={FilledInput}
                  name="address"
                />
              </FormControl>

              <FormControl>
                 <FormLabel id="demo-controlled-radio-buttons-group">Payment Method</FormLabel>
                    <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={value}
                    onChange={handleChange}
                          >
              <FormControlLabel value="cash" control={<Radio />} label="Cash" />
              <FormControlLabel value="card" control={<Radio />} label="Card" />
                  </RadioGroup>
             </FormControl>

              
            
              <Box
                sx={{
                  '& > :not(style)': { m: 1, width: '40ch' },
                }}
                noValidate
                autoComplete="off"
              >
                <Field as={TextField} name="card_number" label="Card Number" variant="filled" />
                <Field as={TextField} name="card_holder" label="Card Holder" variant="filled" />              
              </Box>


              <Box
                sx={{
                  '& > :not(style)': { m: 1, width: '19ch' },
                }}
                noValidate
                autoComplete="off"
              >
                <Field as={TextField} name="expiry_date" label="Expiry Date" variant="filled" />
                <Field as={TextField} name="cvc" label="CVC" variant="filled" />
              </Box>

              <Box fontSize={17}  >
                <text  className="field-name">Price Details: $</text>
                <text className="field-value"> {"10000"} </text>
                <text className="field-name"> x </text>
                <text className="field-value"> {"3"} </text>
                <text className="field-name"> days </text>
                {/* "10000" and "3" are only examples*/}
              </Box>

              <Box fontSize={17}>
                <text className="field-name">Total Cost: $ </text>
                <text className="field-value"> {"30000"} </text>
              </Box>
              
              <Button type='submit' variant='contained' onSubmit={onSubmit} sx={{ m: 2 }}
              style={{ color: "#fff", backgroundColor: "#e87123", borderRadius: 40}}>
                  Book
              </Button>

    
            </Container>
          </Form>
        )}
        </Formik>

    )
}

export default RentCheckout;