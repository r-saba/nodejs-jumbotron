'use strict';

const request = require('request');

exports.apiCall = function(args, cb) {
    
    let error = '';
    let response = {};
    let body = '';

    if (args.apiCall === 'hello') {
        response.statusCode = 200;
        body = "Hello world";
    }
    else {
        error = "API Call not found";
        response.statusCode = 404;
        body = "Nothing here";
    }
    cb(error, response, body);
}
