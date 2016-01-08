var Profile = require("./profile.js");
var renderer = require("./renderer.js");
var querystring = require("querystring");
var commonHeaders = {'Content-Type': 'text/html'};
//Handle HTTP route GET / and POST /i.e. HOME
function home(request, response){
  if (request.url === '/'){
    if(request.method.toLowerCase()=== "get"){
        response.writeHead(200,commonHeaders);
        renderer.view("header",{},response);
        renderer.view("css",{},response);
        renderer.view("search",{},response);
        renderer.view("footer",{},response);
        response.end();
    } else {
      //if url ==='/' && POST
      //get the post data from body
      request.on("data",function(postBody){
        //extraxt the username
        var query = querystring.parse(postBody.toString());
          //redirect to /:username
        response.writeHead(303, {"Location": "/" + query.username});
        response.end();
      });
      
    }
      
      
    
    }
}
// Handle HTTP route GET / :username i.e. / chalkers

function user(request, response){
  var username = request.url.replace("/", "");
  if (username.length > 0) {
  response.writeHead(200,commonHeaders);
  renderer.view("header",{},response); 
  renderer.view("css",{},response);
    
  var studentProfile = new Profile(username);
  studentProfile.on("end",function(profileJSON){
   //show profile
    
    //store the values which  we need 
    var  values = {
      avatarUrl:profileJSON.gravatar_url,
      username:profileJSON.profile_name,
      badges:profileJSON.badges.length,
      javascriptPoints:profileJSON.points.JavaScript
    }
    //simple response
 renderer.view("profile", values, response);     
 renderer.view("footer",{},response);
 response.end();

    
});
  studentProfile.on("error", function(error){
    renderer.view("error",{errorMessage: error.message},response);
    renderer.view("search",{},response);
    renderer.view("footer",{},response);
    response.end();
  });
  
  }
}

module.exports.home = home;
module.exports.user = user;