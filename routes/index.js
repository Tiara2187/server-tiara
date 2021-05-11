const router = require('express').Router();
const userRoutes = require('./user')
const categoryRoutes = require('./category')
const productRoutes = require ('./product')
const cartRoutes = require ('./cart')
const checkoutRoutes = require ('./checkout')
const addressRoutes = require ('./address')

const errorHandlers = require('../helpers/errorHandlers')

router.use('/users', userRoutes)
router.use('/product', categoryRoutes)
router.use('/product', productRoutes)
router.use('/users', cartRoutes)
router.use('/users', checkoutRoutes)
router.use('/users', addressRoutes)

router.use(errorHandlers)
module.exports = router