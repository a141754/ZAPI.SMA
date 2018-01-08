var Client = require("zapi_nodejs");
var prettyjson = require('prettyjson');
var request = require('request');

//Define ZAPI credentials
var BASE_URL = 'https://prod-api.zephyr4jiracloud.com/connect'
var ACCESS_KEY = 'amlyYTpjYmQ2MzVlZC0xMjYwLTRkYjAtYjE2NC04OWNmMWI0MDYxN2QgYXB1cm1hd2luYXRhIFVTRVJfREVGQVVMVF9OQU1F'
var SECRET_KEY = '3qguIZqtPM-LU8uWLsj27usB-wGCA513P03vr6I5YYU'
var USER = 'apurmawinata'
//Create Instance
 var JwtClient = new Client(BASE_URL, ACCESS_KEY, SECRET_KEY, USER);
//To Create API Specific JWT Token.
  var METHOD = 'POST'
  var API_URI = 'https://prod-api.zephyr4jiracloud.com/connect/public/rest/api/1.0/executions'
  var JWT_EXPIRE = 72000
  
  var token = JwtClient.generateJWT(METHOD, API_URI, JWT_EXPIRE);
  var request_body = {"executions":["0001515035128212-242ac112-0001", "0001515036533831-242ac112-0001"],"status":1,"clearDefectMappingFlag":false,"testStepStatusChangeFlag":true,"stepStatus":-1}

  console.log(API_URI)
  console.log("JWT " + token);

var options = {
  noColor: true
};

request({
    method: 'POST',
    url: API_URI,
    headers: {
        'Authorization': 'JWT '+token,
        'zapiAccessKey': ACCESS_KEY,
        'User-Agent': 'ZAPI',
    },
    json: request_body} ,function (error, response, body) {
    console.log('statusCode: ' + prettyjson.render(response.statusCode));
    console.log('Headers: ' +  prettyjson.render(response.headers));
    console.log('Body: ' + prettyjson.render(body));
});
