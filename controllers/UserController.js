const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class UserController {
    static register(req, res, next) {
        const { username, password, email, phone } = req.body
        User.create({ username, password, email, phone})
            .then(user => {
                res.status(200).json({ success: true, data: user })
            })
            .catch(next)
    }

    static login(req, res, next) {
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

    static async getUser(req, res, next) {
        try{
       const getUser = await User.findById (req._userId)
       res.status(200).send({success: true, data : getUser})
        }
        catch(e) { next({name: 'NOT_FOUND'}) }
   }

    static async getOneUser(req,res,next) {
        try{
            const { id } = req.params
       const getOneUser = await User.findById(id)
       res.status(200).send({success: true, data : getOneUser})
        }
        catch(any) { next({name: 'NOT_FOUND'}) }
   }
   
   static async updateProfile(req,res,next) {
       const {username, firstname, lastname, password, birthdate, address} = req.body
       const salt = bcrypt.genSaltSync(10)
       try{
           const newData = {username, firstname, lastname, password, birthdate, address}
           if(password)newData.password = await bcrypt.hashSync(newData.password,salt)
           for(let key in newData) if(!newData[key]) delete newData[key]
           const profileData = await User.findByIdAndUpdate(req._userId, newData,{new: true})
           res.status(200).json({success : true, data : profileData })
       }
       catch(e) { next({name: 'NOT_FOUND'})}
   }

    static async updateUser(req,res,next) {
        const {username, firstname, lastname, password, birthdate, address} = req.body
        const salt = bcrypt.genSaltSync(10)
        try{
        const newData = {username, firstname, lastname, password, birthdate, address}
        if(password)newData.password = await bcrypt.hashSync(newData.password,salt)
        for(let key in newData) if(!newData[key]) delete newData[key]
        const updateUser = await User.findByIdAndUpdate(req._userId,newData,{new : true })
        res.status(200).json({success : true , data : updateUser })
        }
        catch (e) { next({name: 'NOT_FOUND'}) }
    }

   static async forgetPassword(req, res, next){
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
module.exports = UserController