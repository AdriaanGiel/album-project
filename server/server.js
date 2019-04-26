require('dotenv').config();
const config = require('./config');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const cors = require('./config/Cors');
const mongodb = require('./database/connect');
const AlbumSeeder = require('./seeds/AlbumSeeder');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Setup Cors options
cors.setupCorsConfig(app);

// Static files
app.use(express.static(__dirname + '/public'));

// Import routes
require('./routes/routes')(app);

// Start mongo database
const mongoose = mongodb.startMongo(config.mongoUri);

// Run seeds
AlbumSeeder(mongoose);

// Start Server
app.listen(config.port);
