console.log('Loading function');

var path = require('path');
var request = require('request');

// Load .env into environment variables
var env = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';

require('dotenv').load({ 
  path: path.join(__dirname, env) 
});


var options = exports.options = {
  method: 'POST',
  url: process.env.INTERCOM_USERS_API,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  auth: {
    user: process.env.AUTH_USER,
    pass: process.env.AUTH_PASS,
    sendImmediately: true
  }  
};


exports.handler = function(event, context) {     
    var message = event.Records[0].Sns.Message;
    options.json = JSON.parse(message);

    function callback(error, response) {
      if (!context) {
        return;
      }
      if (error) {
        context.fail(error);  
      } else if (!error && response.statusCode === 200) {        
         context.succeed();
      } else {        
         context.fail(new Error(JSON.stringify(response)));
      }
    }
    
    request(options, callback);
};