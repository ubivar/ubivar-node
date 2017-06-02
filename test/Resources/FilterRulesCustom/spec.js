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

describe("FilterRulesCustom", function(){
  describe("Properties", function(){
    it("Should have a name and path attribute", function() {
      expect(ubivar["FilterRulesCustom"]["path"]).to.exist
    })

    it("Should link to parent (ubivar)", function() {
      expect(ubivar["FilterRulesCustom"]["ubivar"]).to.exist
    })

    _.each(methods, function(method){
      var METHOD      = method.toUpperCase()
      it("Should have "+METHOD+" methods", function(done) {
        if(!_.isFunction(ubivar["FilterRulesCustom"][method])){
          return done(new Error("Should have "+METHOD+" methods"))
        }
        done()
      })
    })
  })

  describe("Methods", function(){
    it("Should create", function(done){
      ubivar["FilterRulesCustom"].create(json 
      , function(err, res){
        if(err){ done(new Error("Did not create")) }

        var rule = res.data.reverse()[0]
          , deepEqual = _.reduce(_.keys(json), function(memo, k){ return memo && json[k] === rule[k] }, true)
        if(deepEqual){
          done()
        } else {
          console.log(err, res)
          done(new Error("Did not create"))
        }
      })
    })

    it("Should update", function(done){
      var ruleId = "0"
      ubivar.set("timeout", 20000)
      ubivar["FilterRulesCustom"].update(ruleId
      , {"value": "yahoo.com"}
      , function(err, res){
        if(err){ done(new Error("Did not create")) }

        var rule = res.data[ruleId]
        if(rule.value === "yahoo.com"){
          // roll back
          ubivar["FilterRulesCustom"].update(ruleId
          , {"value": "gmail.com"}
          , done)
        } else {
          console.log(err, res)
          done(new Error("Did not update"))
        }
      })
    })

    it("Should delete", function(done){
      ubivar.set("timeout", 20000)
      ubivar["FilterRulesCustom"].list(function(err, res){
        if(err){ done(new Error("Did not list"))}
        var ruleId = res.data.length - 1
        ubivar["FilterRulesCustom"].del(ruleId, function(err, res){
          if(!err && res.data.length === 2){ return done() }
          done(err)
        })
      })
    })
  })
})