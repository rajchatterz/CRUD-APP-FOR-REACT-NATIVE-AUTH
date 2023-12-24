const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Product = require('./models/ProductModel')
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.get('/', (req, res) => {
    res.send("Hello World")
})

app.get('/blog', (req, res) => {
    res.send("This is blog page")

})
app.post('/product', async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        console.log("error")
    }
})
app.get('/product', async(req, res) => {
    try {
        
        const product = await Product.find({})
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json(error)
    }
})

app.get('/product/search', async (req, res) => {
    const searchValue = req.query.q;
    try {
        let product;
        if (searchValue) {
            product = await Product.find({ name: { $regex: new RegExp(searchValue, 'i') } });
        } else {
            product = await Product.find({});
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json(error);
    }
});


app.put('/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body)
        if (!product) {
            return res.status(404).json({message:"we can not find any product with this id"})
        }
        const updateProduct = await Product.findById(id)
        res.status(200).json(updateProduct)
    
    } catch (error) {
        res.status(500).json(error)
    }
})
app.delete('/product/:id', async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findByIdAndDelete(id)
        if(!product){
            return res.status(404).json({message:"we can not find any product with this id"})
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json(error)
    }
})
app.listen(3000, () => {
    console.log("Connection successfull")
})
mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://rajchatterz:{add your password}@edtech.df872ze.mongodb.net/?retryWrites=true&w=majority').then(()=>console.log("connected mongodb"))