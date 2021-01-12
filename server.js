// Setup empty JS array of Objects to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server

// push data to project array when there is a /add post request
app.post('/add', (req, res) => {
    projectData.push(req.body);
    console.log(projectData);
});

// return project array when there is get request to /data
app.get('/data', (req, res) => {
    res.send(projectData);
});


// set port to be 3000 or a given port in .env config
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});