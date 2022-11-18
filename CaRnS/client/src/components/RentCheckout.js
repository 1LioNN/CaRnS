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
import { useAuth } from "../Utils/AuthContext.js";

import Box from '@mui/material/Box';
//import { Grid, tableBodyClasses } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const today = new Date()

const initialValues = {
  address: '',
  card_number: '',
  card_holder:'',
  expiry_date: '',
  cvc: '',
  startDate: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(),
  endDate: ''  
}


const RentCheckout = () => {
    const auth = useAuth()
    const params = useParams()
    let navigate  = useNavigate()
    const { _, setNotification } = useNotification()

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
                document.getElementById('rent-price').innerHTML = data.rentListingDetails.rentPrice;
            }
        }
        fetchRentDetail()
    }, [])
    

    // const { _, setNotification } = useNotification();
    const onSubmit = async (data) => {
        if (! auth.user){
			return
		}
		const response = await fetch(
			"http://localhost:8000/api/transaction/log",
			{
				method: "POST",
				mode: "cors",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					"customerID": auth.user._id,
					"listingID": rentListing._id,
                    "bookingStartDate": data.startDate,
                    "bookingEndDate": data.endDate
				}),
			}
		);

        const status = response.status;
        console.log(status)
        const resData = await response.json();
        console.log(resData)

        if (status === 200) {
			navigate("/profile");
            
		} else {
			setNotification({
				message: resData.error,
				severity: "error",
				open: true,
			});
		}
    }


    const [value, setValue] = React.useState('cash');

    const handleChange = (event) => {
        //setValue(event.target.value);
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


              {/* <Typography fontSize={17} color='grey'>
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
             </FormControl> */}

              
            
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

              <Box
                sx={{
                  '& > :not(style)': { m: 1, width: '30ch' },
                }}
                noValidate
                autoComplete="off"
              >
                <Field as={TextField} name="startDate" label="Start Date (YYYY-MM-DD)" variant="filled" />
                <Field as={TextField} name="endDate" label="End Date (YYYY-MM-DD)" variant="filled"/>
              </Box>

              <Box fontSize={17}  >
                <text  className="field-name">Price Details: $</text>
                <text className="field-value" id="rent-price"> {"10000"} </text>
                <text className="field-name"> x </text>
                <text className="field-value" id="rent-days"> {"3"} </text>
                <text className="field-name"> days </text>
                {/* "10000" and "3" are only examples*/}
              </Box>

              <FormControl
                id="rent-days"
                placeholder="0"
                value={5}
                //error={touched.username && errors.username}
                onChange={handleChange}
                //onBlur={handleBlur}
                />
                
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