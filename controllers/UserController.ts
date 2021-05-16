import { NextFunction, Request, Response } from 'express';
import { User } from '../models/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

class UserController {
    static register(req: Request, res: Response, next: NextFunction) {
        const { username, password, email, phone } = req.body
        User.create({ username, password, email, phone})
            .then(user => {
                res.status(200).json({ success: true, data: user })
            })
            .catch(next)
    }
    
    static login(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body
        User.findOne({ email : email })
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = jwt.sign({_id :  user._id}, 'ASS3STORE')
                res.status(200).send({ success: true, user, token })
            }
                else if(!user) {next({name: 'NOT_FOUND'})}
                else next({name : 'LOGIN_FAILED'})
        })
        .catch(e => {next({name: 'NOT_FOUND'})})
            
    }

    static async getUser(req: Request, res: Response, next: NextFunction) {
        try{
       const getUser = await User.findById((<any>req)._userId)
       res.status(200).send({success: true, data : getUser})
        }
        catch(e) { next({name: 'NOT_FOUND'}) }
   }

    static async getOneUser(req: Request, res: Response, next: NextFunction) {
        try{
            const { id } = req.params
       const getOneUser = await User.findById(id)
       res.status(200).send({success: true, data : getOneUser})
        }
        catch(any) { next({name: 'NOT_FOUND'}) }
   }

   static async updateProfile(req: Request, res: Response, next: NextFunction) {
    const {username, firstname, lastname, password, birthdate, address} = req.body
    const salt = bcrypt.genSaltSync(10)
    try{
        const userData = {username, firstname, lastname, password, birthdate, address}
        if(password)userData.password = await bcrypt.hashSync(userData.password,salt)
        for(let index in userData) if(!(<any>userData)[index]) delete (<any>userData)[index]

        const updateProfile = await User.findByIdAndUpdate((<any>req)._userId, userData,{new: true})
        res.status(200).json({success : true, data : updateProfile })
    }
    catch(any) { next({name: 'NOT_FOUND'})}
    }

    static async forgetPassword(req: Request, res: Response, next: NextFunction){
        const { username, password, email } = req.body
        const user = await User.findOne({ username: username, email: email})
        if (user){
            const salt = bcrypt.genSaltSync(10)
            const newData = { password }
            newData.password = bcrypt.hashSync(newData.password, salt)
            const updateUserPass = await User.findOneAndUpdate({ email: email}, newData, { new: true})
            res.status(200).json({success : true, data : updateUserPass})            
        }
        else{ next({name: 'NOT_FOUND'})}
    }
    
}

export default UserController
