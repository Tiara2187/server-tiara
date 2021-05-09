const Address = require('../models/Address')

class addressController {

    static async createAddress(req, res, next){
        const { village, district, city, province, country, zip } = req.body
        try {
            const addressData = await Address.findOne({ user: req._userId })
            if (addressData) {
                const newAddress = {village, district, city, province, country, zip}
        for(let key in newAddress) if(!newAddress[key]) delete newAddress[key]
        const addressData = await Address.findOneAndUpdate({user : req._userId},newAddress,{new : true})
        res.status(200).json({result : true, addressData})
            }
            else {
                const address = await new Address({
                    user: req._userId,
                    village, district, city, province, country, zip
                })
                address.save()
                res.status(200).json({ success: true, data: address })
            }
        }
        catch (e) { next({name :'NOT_FOUND' }) }
    }

    static async getAddress(req, res, next){
        try{
            const addressData = await Address.findOne({user : req._userId})
            .populate('user')
            res.status(200).json({success : true, data : addressData})
        }
        catch(e){next({name :'NOT_FOUND' })}
    }

    static async updateAddress(req,res,next){
        const {village, district, city, province, country,zip} = req.body
      try{
        const newAddress = {village, district, city, province, country, zip}
        for(let key in newAddress) if(!newAddress[key]) delete newAddress[key]
        const addressData = await Address.findOneAndUpdate({user : req._userId},newAddress,{new : true})
        res.status(200).json({result : true, addressData})
      }
        catch (e){next({name :'NOT_FOUND' })}
    }

    static async deleteAddress(req,res,next){
        if(await Address.findOneAndDelete({user : req._userId})){
        res.status(200).json({result : true, message : 'Delete Success'})
        }
        else {next({name :'NOT_FOUND' })}
    }


}

module.exports = addressController