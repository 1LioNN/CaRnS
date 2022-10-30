import React from 'react';
import ActiveSellList from '../ActiveSellList';
import ProfileSideBar from '../ProfileSideBar';

function VendorHistoryPage(){
    return(
        <vendorhistorypage>
            <ProfileSideBar />
            <ActiveSellList/>
        </vendorhistorypage>        
    );
}

export default VendorHistoryPage;