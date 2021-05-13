const router = require('express').Router()
const CartController = require('../controllers/CartController')
const UserAuth = require('../helpers/authentication')

        router.post('/addcart', UserAuth,CartController.addCart)
        router.post('/createcart', UserAuth, CartController.createcart)
        router.get('/listcart', UserAuth, CartController.listCart)
        router.get('/detailcart/:cartId', UserAuth, CartController.getDetailCart)
        router.get('/addonecart/:productId', UserAuth, CartController.addOneCart)
        router.delete('/deleteonecart/:productId', UserAuth, CartController.deleteOneCart)
        router.delete('/deletecart/:cartID', UserAuth, CartController.deleteCart)

module.exports = router