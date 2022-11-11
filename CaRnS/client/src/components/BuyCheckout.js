import React from 'react';
import { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { useAuth } from "../Utils/AuthContext.js";
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useNotification } from "../Utils/NotificationContext";
import { useNavigate } from 'react-router-dom';

function BuyCheckout(){
	const [buyListing, setBuyListing] = useState(null);
	const [sta, setSta] = useState(false);
	let params = useParams();
	const auth = useAuth();
	const { _, setNotification } = useNotification();
	let navigate  = useNavigate();
	const [v, setV] = useState(false);

	
	useEffect(() => {
		const url = 'http://localhost:8000/api/listing/view-detail-buy/'+ params.listId;
		const fetchBuyDetail = async () => {
			const response = await fetch(url, {
				method: 'GET',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			
			const data = await response.json()
			
			if (response.ok){
				if (data.buyListingDetails.isActive == false){
					setSta(true)
				}
				setBuyListing(data)
			}
			
		}
		
		fetchBuyDetail()
	},[v])
	
	const checkout = async (e) => {
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
					"listingID": buyListing._id
				}),
			}
		);
		const status = response.status;
		console.log(status);
		const resData = await response.json();
		console.log(resData);
		if (status === 200) {
			setV(true);
			navigate("/profile");
		} else {
			setNotification({
				message: resData.error,
				severity: "error",
				open: true,
			});
		}
	};
	
	if (sta == true){
		return (
			<Typography
			component="h1"
			variant="h3"
			align="center"
			color="text.primary"
			gutterBottom
			>
			Order Placed
			</Typography>
		)
	}
	
	return(
		<buydetail>
		{	buyListing? 
			
			<>
			
			<Container >
			<Typography
			component="h1"
			variant="h3"
			align="center"
			color="text.primary"
			gutterBottom
			>
			{buyListing.listingName}
			</Typography>
			
			<Typography
			component="h1"
			variant="h4"
			align="right"
			color="text.primary"
			gutterBottom
			>
			Total: {buyListing.buyListingDetails.salePrice}
			</Typography>
			
			<Typography
			component="h1"
			variant="h3"
			align="left"
			color="text.primary"
			gutterBottom
			>
			Payment:
			</Typography>
			<form onSubmit={checkout}>
			<Stack>
			<input required id="input" name="input" placeholder="Card Number" />
			<input required id="input" name="input" placeholder="Card Holder" />
			<input required id="input" name="input" placeholder="Expire Date (yyyy/mm)" />
			<input required id="input" name="input" placeholder="CVV/CVC" />
			</Stack>
			<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}> Checkout</Button>
			</form>
			</Container>
			</>: <><h1 style={{color: 'black'}}> LOADING </h1></>
		}
		</buydetail>
	);
}

export default BuyCheckout;