//
var fs = require("fs");

function mergeValues(values, content){
//Cycle over the keys
  
  for (var key in values) {
  //Replace all {{keys}} with the value from the values objects
    //values.avatarUrl ===values["avatarUrl"]
    content = content.replace("{{" + key + "}}", values[key]);
  }
  //return merged content
  return content;
}
function view(templateName, values, response){
  //read from the template file
  var fileContents = fs.readFileSync('./views/'+templateName + '.html',{encoding:"utf8"});
  fileContents = mergeValues(values, fileContents);

  //Insert values in to the content 
  
  //write out to the response 
  response.write(fileContents);
} 

module.exports.view = view;