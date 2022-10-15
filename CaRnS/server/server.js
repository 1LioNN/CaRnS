const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const session = require('express-session');

const authenticationRoutes = require('./routes/authenticationRoutes')
const listingRoutes = require('./routes/listingRoutes')

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(session({
    secret: "cscc01FinalProjectCARNS",
    resave: false,
    saveUninitialized: false,
    cookie: {
        path: '/',
        httpOnly: false,
        secure: false,
        maxAge: 1000 * 60 * 60  // 1 hour
    }
}));
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
