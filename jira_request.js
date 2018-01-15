var prettyjson = require('prettyjson');
var request = require('request');

var options = {
  noColor: true
};


module.exports = {
  getIssueID: function (issueKey) {
    var API_URI = `https://aglenergy.atlassian.net/rest/api/2/issue/${issueKey.toString()}`
    var option = {
      uri: API_URI,
      headers: {
          // 'User-Agent': 'Request-Promise',
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Basic bmhlcnplZ292aW5hQGFnbC5jb20uYXU6Y29tcFNDSTE0IQ==',
      },
      json: true // Automatically parses the JSON string in the response
    };
    console.log(API_URI)

    // request({
    //   method: 'GET',
    //   url: API_URI,
      // headers: {
      //   'Accept': 'application/json',
      //   'Content-Type': 'application/json',
      //   'Authorization': 'Basic bmhlcnplZ292aW5hQGFnbC5jb20uYXU6Y29tcFNDSTE0IQ==',
    //   },
    //   } ,function (error, response, body) {
    //   // console.log('statusCode: ' + prettyjson.render(response.statusCode));
    //   // console.log('Headers: ' +  prettyjson.render(response.headers));
    //   // console.log('Body: ' + prettyjson.render(JSON.parse(body)["id"]));
    //   return result.concat(prettyjson.render(JSON.parse(body)["id"]));
    // });


    return option;
  }
  
};
