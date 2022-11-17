import React from 'react';
import ProfileSideBar from '../ProfileSideBar';
import BuyerHistory from '../BuyerHistory';

function BuyerHistoryPage(){
    return(
        <vendorhistorypage>
            <ProfileSideBar />
            <BuyerHistory/>
        </vendorhistorypage>        
    );
}

export default BuyerHistoryPage;