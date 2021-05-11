const Product = require('../models/Product')

class ProductController {
    static createProduct(req, res, next)
    {
      const {productname, productprice,productimage, category,description, preview, color, size, quantity } = req.body
      const product = new Product({
        productname, productprice,productimage, category, description, preview, color, size, quantity
      })
      product.save()
      .then((product) => {
        res.status(201).json({message:'Success add product', data: product})
      })
      .catch(next)
    }
  
    static postProduct(req, res, next)
    {
      const {productname, productprice, category, description, preview, color, size, quantity} = req.body
      const productimage = req.file.path
      const product = new Product({
        productname, productprice, category, productimage, description, preview, color, size, quantity
      })
      product.save()
      .then(result => {
        res.status(201).json({success : true, result})
      })
      .catch(e => {next({name: 'PRODUCT_NOT_FOUND'})})
    }
  
      static async getOneProduct(req, res, next)
      {
          const {productId} = req.params
          try{
              const product = await Product.findById(productId)
              .populate('category')
              res.status(200).json({success: true, product})
          }
          catch (any) { next({name: 'PRODUCT_NOT_FOUND'})}
      }
  
        static async listProduct(req, res, next) {
          try {
          const product = await Product.find()
          .populate('category')
          res.status(200).json({success : true, product})
          }
          catch  (e) { next({name: 'PRODUCT_NOT_FOUND'}) }
        }
  
        static async getCategory(req, res, next){
            const {categoryID} = req.params
            try{
                const product = await Product.find({category : categoryID})
                .populate('category')
                res.status(200).json({success : true,product})
            }
            catch (any) { next({name: 'PRODUCT_NOT_FOUND'})}
        }
      
  }

  module.exports = ProductController