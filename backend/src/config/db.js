import mongoose from "mongoose"

export const connectDB = async (MONGO_URI) => {
    try {
        const conn = await mongoose.connect(MONGO_URI)
        console.log(`Database Connected Successfully : ${conn.connection.host}`)
    } catch (error) {
        console.error(error.message)
        process.exit(1) // 1 means error. 0 means success
    }
}