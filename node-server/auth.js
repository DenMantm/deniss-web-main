var passport = require('passport');
var docker = require('./database/models/docker-container-model')

// super important that you use "username" in the body.
exports.authenticate = function(req, res, next) {
  console.log(req.body);
  //req.body.username = req.body.username.toLowerCase();
  var auth = passport.authenticate('local', function(err, user) {
    if(err) {return next(err);}
    if(!user) { 
      return res.json({status:'failed'}); 
    }
    req.logIn(user, function(err) {
      if(err) {return next(err);}
      
      var currentContainer = process.env.DATABASE_ID;
      
      //currentContainer = 'oK0ZWPNB';
      //if undefined, all good...
      if(currentContainer == undefined) return res.send({status:'success-xxx', user: user});
      
      docker.findOne({'identificationId': currentContainer.trim() }, function(err, p) {
        if (err) {
            return res.send({ error: err });
        }
        else if (!p) {
            res.json({status:'failed'});
        }
        else{
          
          if(p.belongsToUser == user.username ){
             res.send({status:'success', user: user});
          }
          else{
            res.json({status:'failed'});
          }
          
          
    //     docker.findOne({ 'belongsToUser':user.username }, function(err, pp) {
    //     if (err) {
    //         return res.send({ error: err });
    //     }
    //     else if (!pp) {
    //       //res.json({status:'failed2',debug1:currentContainer,debug2:user.username});
    //         res.json({status:'failed'});
    //     }
    //     else{
          
    //       return res.send({status:'success', user: user});
          
    //     }
        
    // });
          

          
         // return res.send({status:'success', user: user});
          
        }
        
    });
      
      
    })
  })
  auth(req, res, next);
};
//exports.signup = passport.authenticate('signup')

exports.signup = function(req, res, next) {
  //req.body.username = req.body.username.toLowerCase();
  var auth = passport.authenticate('signup', function(err, user,info) {
      if(info.status == 'created'){
        req.logIn(user, function(err) {
       if(err) {return next(err);}
       return res.json(info);
     })
      }
      else{
        return res.json(info);
      }

     
  })
  auth(req, res, next);
};


exports.getCurrentIdentity = function(req, res, next) {
  console.log("Sending this value: ");
  console.log(req.user);
  res.status(200).send(req.user);
  res.end();
}

exports.requiresApiLogin = function(req, res, next) {
  if(!req.isAuthenticated()) {
    res.status(403);
    res.end();
  } else {
    next();
  }
};

exports.requiresRole = function(role) {
  return function(req, res, next) {
    if(!req.isAuthenticated() || req.user.roles.indexOf(role) === -1) {
      res.status(403);
      res.end();
    } else {
      next();
    }
  }
}