const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const authenticationRoutes = require('./routes/authenticationRoutes')
const listingRoutes = require('./routes/listingRoutes')

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/user', authenticationRoutes)
app.use('/api/listing', listingRoutes)

const uri = process.env.ATLAS_URI;
mongoose.connect(uri)
    .then(() => {

        //listen for requests
        app.listen(port, () => {
            console.log(`Connected to DB & server is running on port: ${port}`);
        });

        
    });
const connection = mongoose.connection;
