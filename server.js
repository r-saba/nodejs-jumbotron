// Load express framework and http server
const express = require('express');
const app = express();
const http = require('http').Server(app);
const ejs = require('ejs');
const helmet = require('helmet');
var fs = require("fs");

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

// Create server on port 3000
http.listen(port, function () {
    console.log('version 1.0.0 listening on *:' + port);
});