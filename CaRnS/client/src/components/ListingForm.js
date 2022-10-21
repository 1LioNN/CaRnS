import React, {useState} from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FilledInput from '@mui/material/FilledInput';

import BasicDateRangePicker from './date-range-picker';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';


const ListingForm = () => {

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

    <Grid 
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >

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
            <input type="file"/>
            <button >Submit</button>
        </div>

    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="listing-name" label="Listing Name" variant="filled" />
      <TextField id="vehicle-type" label="Vehicle Type" variant="filled" />
     
    </Box>

    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="car-make" label="Car Make" variant="filled" />
      <TextField id="car-model" label="Car Model" variant="filled" />
      <TextField id="car-year" label="Car Year" variant="filled" />
    </Box>
        
        <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">Listing Type</FormLabel>
            <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            >
                <FormControlLabel value="Sell" control={<Radio />} label="Sell" checked={showhide==='Sell'} onClick={handleshow} />
                 <FormControlLabel value="Rent" control={<Radio />} label="Rent" onClick={handleshow}/>
            </RadioGroup>    
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
        }

        <FormControl fullWidth sx={{ m: 0 }} variant="filled">
          <InputLabel htmlFor="filled-adornment-amount">Amount</InputLabel>
          <FilledInput
            id="filled-adornment-amount"
            value={values.amount}
            onChange={handleChange('amount')}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </FormControl>

        <Button type='submit' variant='contained' sx={{ m: 2 }}
        style={{ color: "#fff", backgroundColor: "#e87123", borderRadius: 40}}>
            Create New Listing
        </Button>


        </Container>

        </Grid>

    )
}

export default ListingForm