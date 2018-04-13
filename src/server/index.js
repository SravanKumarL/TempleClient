// Main starting point of the application.
import dbConfig from './dbconfig';
const express = require('express');
const http = require('http')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose');
const cors = require('cors');

//DB Setup 
mongoose.connect(dbConfig.mongoURL);

const app = express();
const router = require('./router');
//App Setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));

router(app);


//Server Setup
const port = dbConfig.port;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on port:', port);