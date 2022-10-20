import './VendorListing.css';
import Button from "@mui/material/Button";

function VendorListing(){
 
    return (
        <vendorlisting className='sidebar'>
        <Button
              className="btn"
              style={{
                borderRadius: 40,
                backgroundColor: "#e87123",
                padding: "8px 30px",
                fontSize: "18px",
                color: "#fff",
                marginLeft: "auto",
                marginRight: "20px",
              }}
              variant="contained"
              disableElevation
              href="/createlisting"
            >
              New Listing
        </Button>
        </vendorlisting>
    )
}

export default VendorListing;