var Client = require("zapi_nodejs");
var prettyjson = require('prettyjson');
var request = require('request');

//passing issueId and projectId to URI from command line, e.g.: node get_executes.js 164429 23100
 console.log("\x1b[34m", 'passing issueId and projectId to URI from command line, e.g.: node zapi_get_executions.js 164429 23100');
 var myArgs = process.argv.slice(2);
 console.log("\x1b[34m", 'issueId, projectId: ', myArgs[0], myArgs[1]);

//Define ZAPI credentials
var BASE_URL = 'https://prod-api.zephyr4jiracloud.com/connect'
var ACCESS_KEY = 'amlyYTpjYmQ2MzVlZC0xMjYwLTRkYjAtYjE2NC04OWNmMWI0MDYxN2QgYXB1cm1hd2luYXRhIFVTRVJfREVGQVVMVF9OQU1F'
var SECRET_KEY = '3qguIZqtPM-LU8uWLsj27usB-wGCA513P03vr6I5YYU'
var USER = 'apurmawinata'
//Create Instance
 var JwtClient = new Client(BASE_URL, ACCESS_KEY, SECRET_KEY, USER);
//To Create API Specific JWT Token.
  var METHOD = 'GET'
  var API_URI = `https://prod-api.zephyr4jiracloud.com/connect/public/rest/api/1.0/executions?issueId=${myArgs[0]}&projectId=${myArgs[1]}`
  var JWT_EXPIRE = 72000
  
  var token = JwtClient.generateJWT(METHOD, API_URI, JWT_EXPIRE);
  
  console.log("\x1b[35m", API_URI)
  console.log("\x1b[32m", "JWT " + token);

request({
    method: 'GET',
    url: API_URI,
    headers: {
        'Authorization': 'JWT '+token,
        'zapiAccessKey': ACCESS_KEY,
        'User-Agent': 'ZAPI',
    }}, function (error, response, body) {
    console.log('statusCode: ' + prettyjson.render(response.statusCode));
    console.log('Headers: ' +  prettyjson.render(response.headers));
    console.log('Body: ' + prettyjson.render(JSON.parse(body)));
    console.log(typeof body, body.constructor.name);
});1
