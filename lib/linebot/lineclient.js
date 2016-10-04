var request = require('request');

function LINEClient(channelToken) {
  var headers = {
    Authorization: 'Bearer ' + channelToken
  };

  var that = this;

  this.get = function(url) {
    return that.sendRequest('GET', url);
  }

  this.post = function(url, data) {
    return that.sendRequest('POST', url, { 'Content-Type': 'application/json; charset=utf-8' }, data);
  }

  this.sendRequest = function(method, url, additionalHeader, reqBody) {
    if ( additionalHeader && Object.keys(additionalHeader).length > 0 ) {
      for ( var i in additionalHeader ) {
        headers[i] = additionalHeader[i];
      }
    }

    var options = {
      method: method,
      url: url,
      headers: headers,
      json: true
    };

    if ( reqBody ) options.body = reqBody;

    return new Promise(function(resolve, reject) {
      request(options, function(error, response, body) {
        if ( !error && response.statusCode == 200 ) resolve(body);
        else if ( !error ) reject(body);
        else reject(error );
      });
    });
  }
}

module.exports = LINEClient;
