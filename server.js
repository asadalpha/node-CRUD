const express = require("express")
const mongoose = require("mongoose")
const app = express()
const Product = require("./models/product_model")

PORT = 3000

app.use(express.json())
//routes

app.get("/",(req,res) => {
    res.send("Hello node api")
})

app.get('/products',async(req,res)=>{
    try{
        const products = await Product.find({});
        res.status(200).json(products);
    }catch(error){
        res.status(500).json({message: error.message})
    }
})



app.get("/products/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

app.post('/products',async (req,res) => {
    try{
        const product = await Product.create(req.body)
        res.status(200).json(product);
    }catch(error){
        console.log(error.message);
        res.status(500).json({message:error.message})
    }
})
//UPDATE
app.put('/products/:id',async(req,res) => {
    try{
        const {id} = req.params;
       const product = await Product.findByIdAndUpdate(id,req.body);
       if(!product){
        return res.status(404).json({message:`Cannot find any product with ID ${id}`})
       }
       const updatedProduct = await Product.findById(id);
       res.status(200).json(product);
    }catch(error){
        console.log(error.message);
        res.status(500).json({message:error.message})
    }
})

//DELETE
app.delete('/products/:id',async(req,res) =>{
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message:`Cannot find product with ID ${id}`})
        }
        res.status(200).json(product)
    }catch(error){
        res.status(500).json({message:error.message})
    }
})


mongoose.connect('mongodb+srv://asadalpha77:NvH4cPDDRyoT3yxA@cluster0.xolqr1f.mongodb.net/node-api?retryWrites=true&w=majority').then(()=>{
    app.listen(PORT, ()=> {
        console.log(`Server is running on PORT ${PORT}`)
    })
    
    console.log('connected to mongoDB')
}).catch(() => {
    console.log('error')
})  