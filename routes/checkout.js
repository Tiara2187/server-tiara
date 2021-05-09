const router = require('express').Router()
const CheckoutController = require('../controllers/CheckoutController')
const UserAuth = require('../helpers/authentication')

router.post('/checkout', UserAuth, CheckoutController.userCheckout)
router.get('/listcheckout', UserAuth, CheckoutController.listCheckout )
router.get('/detailcheckout/:checkoutId', UserAuth, CheckoutController.detailCheckout)
router.delete('/deletecheckout/:checkoutId', UserAuth, CheckoutController.deleteCheckout)


module.exports = router