import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'

const userAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization').replace('Bearer ', '')
    if(token){
      jwt.verify(token, 'ASS3STORE',(err,decoded) => {
        if(err) next({name: 'INVALID_TOKEN'})
        else{
          (<any>req)._userId = decoded._id;
          next()
        }
      })
    }else next({name : 'MISSING_TOKEN'})

  }
  
export default userAuth



