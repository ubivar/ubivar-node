var _                 = require("lodash")
  , expect            = require("chai").expect
  , ubivar            = require("../../ubivar")
  , examples          = require("../../data/Event")
  , jsons             = _.map(examples, function(x){return {"id": x.id, "parameters": x}})
  , ids               = _.map(examples, function(x){return x.id})
  , rootProps         = ["log","_api"]
  , subProps          = ["auth","protocol","timeout","resources","revokedCerts","headers","request"]
  , methods           = ["retrieve", "update", "del", "list"]
  , json              = { 
    "value"           : "New Value"
  , "feature"         : "email_domain"
  , "description"     : "abc@gmail.com"
  , "is_active"       : "true"
  }

describe("FilterWhitelist", function(){
  describe("Properties", function(){
    it("Should have a name and path attribute", function() {
      expect(ubivar["FilterWhitelist"]["path"]).to.exist
    })

    it("Should link to parent (ubivar)", function() {
      expect(ubivar["FilterWhitelist"]["ubivar"]).to.exist
    })

    _.each(methods, function(method){
      var METHOD      = method.toUpperCase()
      it("Should have "+METHOD+" methods", function(done) {
        if(!_.isFunction(ubivar["FilterWhitelist"][method])){
          return done(new Error("Should have "+METHOD+" methods"))
        }
        done()
      })
    })
  })

  describe("Methods", function(){
    it("Should create", function(done){
      ubivar["FilterWhitelist"].create(json 
      , function(err, res){
        if(err){ done(new Error("Did not create")) }

        var whitelist = res.data.reverse()[0]
          , deepEqual = _.reduce(_.keys(json), function(memo, k){ return memo && json[k] === whitelist[k] }, true)
        if(deepEqual){
          done()
        } else {
          console.log(err, res)
          done(new Error("Did not create"))
        }
      })
    })

    it("Should update", function(done){
      var whitelistId = "0"
      ubivar["FilterWhitelist"].update(whitelistId
      , {"value": "yahoo.com"}
      , function(err, res){
        if(err){ done(new Error("Did not create")) }

        var whitelist = res.data[whitelistId]
        if(whitelist.value === "yahoo.com"){
          // roll back
          ubivar["FilterWhitelist"].update(whitelistId
          , {"value": "gmail.com"}
          , done)
        } else {
          console.log(err, res)
          done(new Error("Did not update"))
        }
      })
    })

    it("Should delete", function(done){
      ubivar["FilterWhitelist"].list(function(err, res){
        if(err){ done(new Error("Did not list"))}
        var whitelistId = res.data.length - 1
        ubivar["FilterWhitelist"].del(whitelistId, function(err, res){
          if(!err && res.data.length === 2){ return done() }
          done(err)
        })
      })
    })
  })
})