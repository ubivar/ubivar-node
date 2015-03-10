# Ubivar node.js bindings 
[![npm version](https://badge.fury.io/js/ubivar.svg)](http://badge.fury.io/js/ubivar) [![Build Status](https://travis-ci.org/ubivar/ubivar-node.png?branch=master)](https://travis-ci.org/ubivar/ubivar-node)  [![Inline docs](http://inch-ci.org/github/ubivar/ubivar-node.svg?branch=master)](http://inch-ci.org/github/ubivar/ubivar-node)
 
Ubivar is an API that takes over the hassle of automatically screening
e-payment for frauds on e-commerce websites. 

Ubivar's purpose is to route the e-payments received by e-commerce websites for
rejection, manual verification or acceptance given their estimated risk.
Ubivar integrates as an additional plugin in your business workflow and returns
the suggested routing for each of the transactions that you process.  Ubivar
does not demand that all resources are sent but the more the better scoring
accuracy. The only two required resources are the `transactions` and the
`labels` that classify the `transactions` as good or bad. The API is simple:
you provide Ubivar your request `token`, and Ubivar provides the hooks to send
and receive the resources to the API.

# Install

`npm install ubivar`

# Documentation

Documentation is available at [https://ubivar.com/docs/nodejs](https://ubivar.com/docs/nodejs)

# API Overview

Every resource is accessed via your `ubivar` instance: 

```js
var Ubivar    = require("ubivar")
  , ubivar    = new Ubivar("your-token", "your-api-version") 
```

Every resource accepts an optional callback as the last argument. 

```js
ubivar.accounts.create( {
    "user_id"       : "test_123"
  , "session_id"    : "test_session_id_123"
  , "user_email"    : "test_email@email-123.com"
  , "first_name"    : "test_yourfirstname_123"
  , "last_name"     : "test_yourlastname_123"
  , "primary_phone" : "+123456789-123"
  }, function(err, resource){
    err // null if no error
    resource // the created resource (account)
  })
```

# Available resources and methods

+ [Me](https://www.ubivar.com/docs/nodejs#me)
    + [retrieve()](https://www.ubivar.com/docs/nodejs#retrieve_your_information)
    + [update(params)](https://www.ubivar.com/docs/nodejs#update_your_information)
+ [Account](https://www.ubivar.com/docs/nodejs#accounts)
    + [create(params)](https://www.ubivar.com/docs/nodejs#create_an_account)
    + [retrieve(id)](https://www.ubivar.com/docs/nodejs#retrieve_an_account)
    + [update(id, params)](https://www.ubivar.com/docs/nodejs#update_an_account)
    + [del(id)](https://www.ubivar.com/docs/nodejs#delete_an_account)
    + [list()](https://www.ubivar.com/docs/nodejs#list_accounts)
+ [Transaction](https://www.ubivar.com/docs/nodejs#transactions)
    + [create(params)](https://www.ubivar.com/docs/nodejs#create_a_transaction)
    + [retrieve(id)](https://www.ubivar.com/docs/nodejs#retrieve_a_transaction)
    + [update(id, params)](https://www.ubivar.com/docs/nodejs#update_a_transaction)
    + [del(id)](https://www.ubivar.com/docs/nodejs#delete_a_transaction)
    + [list()](https://www.ubivar.com/docs/nodejs#list_transactions)
+ [Login](https://www.ubivar.com/docs/nodejs#login)
    + [create(params)](https://www.ubivar.com/docs/nodejs#create_login_event)
    + [retrieve(id)](https://www.ubivar.com/docs/nodejs#retrieve_login_event)
    + [del(id)](https://www.ubivar.com/docs/nodejs#delete_login_event)
    + [list()](https://www.ubivar.com/docs/nodejs#list_login_events)
+ [Logout](https://www.ubivar.com/docs/nodejs#logout)
    + [create(params)](https://www.ubivar.com/docs/nodejs#create_logout_event)
    + [retrieve(id)](https://www.ubivar.com/docs/nodejs#retrieve_logout_event)
    + [del(id)](https://www.ubivar.com/docs/nodejs#delete_logout_event)
    + [list()](https://www.ubivar.com/docs/nodejs#list_logout_events)
+ [Item](https://www.ubivar.com/docs/nodejs#items)
    + [create(params)](https://www.ubivar.com/docs/nodejs#create_item)
    + [retrieve(id)](https://www.ubivar.com/docs/nodejs#retrieve_item)
    + [update(id, params)](https://www.ubivar.com/docs/nodejs#update_item)
    + [del(id)](https://www.ubivar.com/docs/nodejs#delete_item)
    + [list()](https://www.ubivar.com/docs/nodejs#list_items)
+ [Label](https://www.ubivar.com/docs/nodejs#labels)
    + [create(params)](https://www.ubivar.com/docs/nodejs#create_label)
    + [retrieve(id)](https://www.ubivar.com/docs/nodejs#retrieve_label)
    + [update(id, params)](https://www.ubivar.com/docs/nodejs#update_label)
    + [del(id)](https://www.ubivar.com/docs/nodejs#delete_label)
    + [list()](https://www.ubivar.com/docs/nodejs#list_labels)

# Configuration

+ `ubivar.set("auth", "your-api-token")`
+ `ubivar.setTimeout(20000) // in ms`, node's default is `120000ms`

# More information / wikis

+ [In-depth documentation](https://www.ubivar.com/docs/nodejs)

# Development

To run the tests, you will need a Ubivar test API key (from your [Ubivar dashboard](https://my.ubivar.com))

```
export UBIVAR_TEST_TOKEN="your-test-api-key"
npm install -g mocha
npm test
```
*Note: on Windows, use `SET` instead of `export` for setting the `UBIVAR_TEST_TOKEN` environment variable.*

# Author

Originally inspired from [stripe-node](https://github.com/stripe/stripe-node). Developed by [Fabrice Colas](https://fabricecolas.me) ([fabrice.colas.@gmail.com](mailto:fabrice.colas@gmail.com)). Maintained by Ubivar. 
