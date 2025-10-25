import express from "express"
import { ENV } from "./config/env.js"
import { connectDB } from "./config/db.js"
import { clerkMiddleware } from '@clerk/express'



const app = express()

app.use(clerkMiddleware())

app.get("/", (req,res) => {
    res.send("Hello World")
})



app.listen(ENV.PORT, ()=>{
    console.log(`Server is listening to PORT : ${ENV.PORT}`)
    connectDB(ENV.MONGO_URI);
})