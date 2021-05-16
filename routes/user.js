const router = require('express').Router()
const UserController = require('../controllers/UserController')
const authentication = require('../helpers/authentication')

router.post('/signup',UserController.register)
router.post('/signin',UserController.login)
router.get('/',UserController.getUser)
router.get('/detailuser/:id',authentication,UserController.getOneUser)
router.put('/updateuser',authentication,UserController.updateUser)
router.put('/forgetpass',UserController.forgetPassword)

module.exports = router