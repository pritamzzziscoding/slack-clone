import mongoose from "mongoose"

export const connectDB = async (PORT) => {
    try {
        const conn = await mongoose.connect(PORT)
        console.log(`Database Connected Successfully : ${conn.connection.host}`)
    } catch (error) {
        console.error(error.message)
    }
}