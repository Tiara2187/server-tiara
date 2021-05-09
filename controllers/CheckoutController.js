const Cart = require('../models/Cart')
const Checkout = require('../models/Checkout')

class CheckoutController{
    static async userCheckout(req, res, next){
        try{
            const cart = await Cart.find({user:req._userId})
            .populate('product')
            if(cart.length >= 1){
                let totalprice = 0
                for(let i = 0; i < cart.length; i++){
                    totalprice += (cart[i].quantity * (cart[i].product.productprice))
                }
                const checkout = new Checkout({
                    user: req._userId,
                    totalprice : totalprice
                })
                await Cart.deleteMany({user : req._userId})
                checkout.save()
                res.status(200).json({success : true, data : checkout})
            }
            else { next({ name: 'PRODUCT_NOT_FOUND'})}
        }
        catch{ next({name: 'NOT_FOUND'})}
    }


    static async listCheckout(req, res, next){
        try{
            const dataCheckout = await Checkout.find({ user: req._userId })
            .populate('user')
            res.status(200).json({success : true, data : dataCheckout})
        }
        catch (e) { next({name: 'PRODUCT_NOT_FOUND'})}
    }

    static async detailCheckout(req, res, next)
    {
        const {checkoutId} = req.params
        try{
            const checkout = await Checkout.find({checkout : checkoutId})
            res.status(200).json({success : true, checkout})

        }
        catch (any) { next({name: 'NOT_FOUND'})}
    }

    static async deleteCheckout(req,res,next){
        const {checkoutId } =req.params
        try{
            await Checkout.findByIdAndDelete(checkoutId)
            res.status(200).json({success : true, message : 'Delete Checkout Success'})
        }
        catch {next({name : 'NOT_FOUND'})}
    }



}

module.exports = CheckoutController