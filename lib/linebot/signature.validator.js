var crypto = require('crypto');
module.exports = {
  validateSignature: function(body, channelSecret, signature) {
    if ( !signature ) throw new Error('Signature must not be empty');

    var expectedHash = crypto.createHmac('sha256', channelSecret)
                       .update(body)
                       .digest('base64');
    return ( signature === expectedHash );
  }
};
