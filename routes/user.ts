import { Router, Request, Response } from "express"
import UserController from '../controllers/UserController'
import userAuth from "../helpers/authentication"
import UserAuth from '../helpers/authentication'


class User {
    router:Router
    constructor(){
        this.router = Router()
        this.user()

    }
    public user():void{
        this.router.post('/signup',UserController.register)
        this.router.post('/signin',UserController.login)
        this.router.get('/',userAuth, UserController.getUser)
        this.router.put('/updateuser',userAuth,UserController.updateProfile)
        this.router.put('/forgetpass',UserController.forgetPassword)
    }
}
export default new User().router