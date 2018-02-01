var request = require('request');

function Client (channelAccessToken) {
  var headers = {
    Authorization: 'Bearer ' + channelAccessToken
  };

  var that = this;

  this.get = function(url, encoding) {
    return that.sendRequest('GET', url, {}, null, encoding);
  }

  this.post = function(url, data) {
    return that.sendRequest('POST', url, { 'Content-Type': 'application/json; charset=utf-8' }, data);
  }

  this.sendRequest = function(method, url, additionalHeader, reqBody, encoding) {
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
    if ( typeof encoding !== 'undefined' ) options.encoding = encoding;

    return new Promise(function(resolve, reject) {
      request(options, function(error, response, body) {
        if ( !error && response.statusCode == 200 ) resolve(body);
        else if ( !error ) reject(body);
        else reject(error );
      });
    });
  }
}

module.exports = Client;
