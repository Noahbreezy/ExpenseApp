require('dotenv').config({ path: '' });
const express = require('express');
const https = require('https');
const fs = require('fs');
const morgan = require('morgan');
// Importing the necessary packages and modules.

const app = express();
app.use(express.json());
app.use(morgan('dev'));