const jwt = require('jsonwebtoken')
const User = require('../models/User')

const userAuth = (req, res, next) => {
      const token = req.header('Authorization').replace('Bearer ', '')
      if(token){
        jwt.verify(token, 'ASS3STORE',(err,decoded) => {
          if(err) next({name: 'INVALID_TOKEN'})
          else{
            req._userId = decoded._id;
            next()
          }
        })
      }else next({name : 'MISSING_TOKEN'})
  
    }
  module.exports = userAuth
  