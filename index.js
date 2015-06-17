console.log('Loading function');

var request = require('request');

var options = exports.options = {
  method: 'POST',
  url: process.env.API,
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
      } else if (!error && (response.statusCode === 200 || ((response.statusCode % 100) === 2))) {        
         context.succeed();
      } else {        
         context.fail(new Error(JSON.stringify(response)));
      }
    }
    
    request(options, callback);
};