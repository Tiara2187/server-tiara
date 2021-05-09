const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    categoryname: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    }
}, 

{
    timestamps: true
})

module.exports = mongoose.model('Category',categorySchema)