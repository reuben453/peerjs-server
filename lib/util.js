var util = {
  debug: false,

  requireAuth: function requireAuth(returnTo, redirect){
    // check if the user is logged in
    return function (req, res, next) {
      for (i = 0; i < arguments.length; i++) {
        for (var property in arguments[i]) {
          if (arguments[i].hasOwnProperty(property)) {
            console.log("argument "+i+": "+(typeof property))
            console.log(property);
          }
        }
      }

      if(!req.isAuthenticated()){
        req.session.messages = "You need to login to view this page";
        if (redirect) {
          req.session.returnTo = returnTo;
          res.redirect('/login');
        }
        else {
          //return next(throw new HttpException(401, "You need to login to view this page")); 
          res.sendStatus(401, "you need to login to view this page");
          next("Unauthorized");
          //return;
        }
      }
      next();
    };
  },

  inherits: function(ctor, superCtor) {
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  },
  extend: function(dest, source) {
    source = source || {};
    for(var key in source) {
      if(source.hasOwnProperty(key)) {
        dest[key] = source[key];
      }
    }
    return dest;
  },
  randomId: function () {
    return (Math.random().toString(36) + '0000000000000000000').substr(2, 16);
  },
  prettyError: function (msg) {
    console.log('ERROR PeerServer: ', msg);
  }
};

module.exports = util;
