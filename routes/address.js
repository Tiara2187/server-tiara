const router = require('express').Router()
const UserAuth = require('../helpers/authentication')
const AddressController = require('../controllers/AddressController')

    router.post('/address',UserAuth, AddressController.createAddress)
    router.get('/address',UserAuth, AddressController.getAddress)
    router.put('/address/update',UserAuth, AddressController.updateAddress)
    router.delete('/address',UserAuth, AddressController.deleteAddress)

module.exports = router