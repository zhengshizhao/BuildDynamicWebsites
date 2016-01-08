var router= require('./router.js');
//Problem: 
//Solution:

//Create a web server
var http = require('http');
const hostname = 'http://localhost';
const port = 3000;

http.createServer(function (request, response){
  router.home(request, response);
  router.user(request, response);
}).listen(port); 


console.log('Server running at <'+hostname+':'+port+'>');


