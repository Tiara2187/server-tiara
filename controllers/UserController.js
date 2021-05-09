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

        User.findOne({ email })
            .then(async (data) => {
                const isTrue = await bcrypt.compare(password, data.password)
                if (data && isTrue) {
                    const load = { id: data.id }
                    const token = jwt.sign(load, process.env.SECRET_KEY)
                    if (!token) next({ name: 'NOT_FOUND' })
                    res.status(200).send({ success: true, _id: data.id, token: token })
                } else next({ name: 'LOGIN_FAILED' })
            })
            .catch(err => { next({ name: 'NOT_FOUND' }) })
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
           const userData = {username, firstname, lastname, password, birthdate, address}
           if(password)userData.password = await bcrypt.hashSync(userData.password,salt)
           for(let i in userData) if(!userData[i]) delete userData[i]
           const { id } = req.params
           const updateProfile = await User.findByIdAndUpdate(id, userData,{new: true})
           res.status(200).json({success : true, data : updateProfile })
       }
       catch(any) { next({name: 'NOT_FOUND'})}
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