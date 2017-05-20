var crypto = require('crypto')
var utf8 = require('utf8')
module.exports = {
  validateSignature: function (body, channelSecret, signature) {
    if (!signature) throw new Error('Signature must not be empty')
    var expectedHash = crypto.createHmac('sha256', channelSecret).update(utf8.encode(body)).digest('base64')
    return (signature === expectedHash)
  }
}
