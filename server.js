// Load express framework and http server
const express = require('express');
const app = express();
const http = require('http').Server(app);
const ejs = require('ejs');
const helmet = require('helmet');
var fs = require("fs");
const service = require('./lib/rest.js');

app.use('/assets', express.static('assets'));
app.set('view engine', 'ejs');
// app.use(helmet());
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "https://code.jquery.com", "https://cdnjs.cloudflare.com", "https://stackpath.bootstrapcdn.com"],
                styleSrc: ["'self'", "fonts.googleapis.com", "'unsafe-inline'", "https://stackpath.bootstrapcdn.com"]
            }
        },
    })
);
app.set('views', __dirname + '/views');

// Configuration variables
var port = 3000;

/**
 * Main page using boostrap
 */
app.get('/', function (req, res) {
    res.render('index', { title: 'Jumbotron | Home' });
});

/**
 * API Calls from Library
 */
app.get('/api/:apiCall', function(req, res, next) {

    let args = {apiCall: req.params.apiCall};
    service.apiCall(args, (function (error, response, body) {

        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.

        res.status(response && response.statusCode || 500);

        if(error) {
            res.send(error);
            next();
        }
        else {
            res.send(body);
            next();
        }

    }));

});

// Create server on port 3000
http.listen(port, function () {
    console.log('version 1.0.0 listening on *:' + port);
});