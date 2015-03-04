/*
 * Socket handler; takes 
 * + a Ubivar resource
 * + a stringified 'content' to be written on the socket
 * + a 'request'
 */
module.exports        = function(ubivar, content, req){
  return function(socket) {
    var isSecure      = ubivar.get("protocol") === "https"
      , connect       = isSecure ? "secureConnect" : "connect"
      , revokedCerts  = ubivar.get("revokedCerts")

    socket.on(connect, function() {
      var fingerprint = socket.getPeerCertificate().fingerprint
        , isRevoked   = revokedCerts.indexOf(fingerprint) > -1
        , isUntrusted = isSecure && isRevoked

      if (isUntrusted) {
        req.abort()
        return callback.call(self,
          new Error.UbivarError({
            "message"     : "Revoked SSL Certificate"
          , "detail"      : "Invalid server certificate. You tried to connect to a server that has a revoked SSL certificate, which means we cannot securely send data to that server. Please email support@ubivar.com if you need help connecting to the correct API server."
          }))
      }

      req.write(content)
      req.end()
    })
  }
}