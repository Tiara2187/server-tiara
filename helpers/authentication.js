const jwt = require('jsonwebtoken')
const User = require('../models/User')

class UserAuth{
    static userAuth(req, res, next){
     //const { token } = req.headers;
      const token = req.header('Authorization').replace('Bearer ', '')
      if(token){
        jwt.verify(token, process.env.SECRET_KEY,(err,decoded) => {
          if(err) next({name: 'INVALID_TOKEN'})
          else{
            req._userId = decoded._id;
            next()
          }
        })
      }else next({name : 'MISSING_TOKEN'})
  
    }
  }
  module.exports = UserAuth
  