var Client = require("zapi_nodejs");
var prettyjson = require('prettyjson');
var request = require('request');
var jira = require('./jira_request');
var rp = require('request-promise');

//passing issueId and projectId to URI from command line, e.g.: node zapi_get_executions.js sma-370 23100
 console.log("\x1b[34m", 'passing issueId and projectId to URI from command line, e.g.: node zapi_get_executions.js 164429 23100');
 var myArgs = process.argv.slice(2);
 console.log("\x1b[34m", 'issueId, projectId: ', myArgs[0], myArgs[1]);

 //Get IssueID
 var getIssueID = jira.getIssueID(myArgs[0]);
 rp(getIssueID)
    .then(function (repos) {
        //Define ZAPI credentials
        var issueID = repos["id"];
        var BASE_URL = 'https://prod-api.zephyr4jiracloud.com/connect'
        var ACCESS_KEY = 'amlyYTpjYmQ2MzVlZC0xMjYwLTRkYjAtYjE2NC04OWNmMWI0MDYxN2QgbmhlcnplZ292aW5hIFVTRVJfREVGQVVMVF9OQU1F'
        var SECRET_KEY = 'OQ-AEZuoQ20RynMK6CGSAUOXz-IP7MUqvPKTr_7wSIQ'
        var USER = 'nherzegovina'
        //Create Instance
        var JwtClient = new Client(BASE_URL, ACCESS_KEY, SECRET_KEY, USER);
        //To Create API Specific JWT Token.
        var METHOD = 'GET'
        var issueID = repos["id"];
        var API_URI = `https://prod-api.zephyr4jiracloud.com/connect/public/rest/api/1.0/executions?issueId=${issueID}&projectId=${myArgs[1]}`
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
        });
    })
    .catch(function (err) {
        // API call failed...
        console.log("API call failed");
    });

