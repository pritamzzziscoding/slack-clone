import express from "express"
import { ENV } from "./config/env.js"
import { connectDB } from "./config/db.js"
import { clerkMiddleware } from '@clerk/express'
import { functions, inngest } from "./config/inngest.js"
import { serve } from "inngest/express"

//creating the express object
const app = express()

//calling the necessary middlewares
app.use(express.json())
app.use(clerkMiddleware()) // req.auth will be available in the object user object is accessible

app.use("/api/inngest", serve({ client: inngest, functions }));

app.get("/", (req,res) => {
    res.send("Hello World this is the serveroo!!!!")
})


//startin the server only if in development

const startServer = async () => {
    try {
        if(ENV.NODE_ENV === "development"){
        app.listen(ENV.PORT, ()=>{
            console.log(`Server is listening to PORT : ${ENV.PORT}`)
            connectDB(ENV.MONGO_URI);
        })
        }
    } catch (error) {
        console.log("Error starting the server: ", error.message);
    }
}

startServer()

export default app