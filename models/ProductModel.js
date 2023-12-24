const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter product name'],
        },
        age: {
            type: Number,
            required: true,
            
        },
        email: {
            type: String,
            required: true,
        }
    },
    {
        timeStamp:true
    }
)

const Product = mongoose.model('Product', productSchema)
module.exports = Product;