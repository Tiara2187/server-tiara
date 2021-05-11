const router = require('express').Router()
const CategoryController = require('../controllers/CategoryController')
const UserAuth = require('../helpers/authentication')

router.get('/category/:categoryID', CategoryController.getCategory)
router.get('/category', CategoryController.listCategory)
router.post('/category/create', CategoryController.createCategory)
router.put('/category/update/:categoryID',UserAuth,CategoryController.updateCategory)
router.delete('/category/:categoryID',UserAuth,CategoryController.updateCategory)

module.exports = router

