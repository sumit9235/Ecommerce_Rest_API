const express = require('express')
require('dotenv').config()
const { userRouter } = require('./routes/user.route')
const { connection } = require('./database/db')
const { productRouter } = require('./routes/product.route')
const app = express()
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Welcome to trivea")
})

app.use("/users",userRouter)
app.use('/products',productRouter)


app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("Connected to Database")
    } catch (error) {
        console.log(error.message)
    }
    console.log("Connected to server")
})