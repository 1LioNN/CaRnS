import React from 'react';
import VendorListing from '../VendorListing';
import ProfileSideBar from '../ProfileSideBar';

function VendorListingsPage(){
    return(
        <vendorlistingpage>
            <ProfileSideBar />
            <VendorListing />
        </vendorlistingpage>        
    );
}

export default VendorListingsPage;