import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"

dotenv.config()
const app = express()

app.use(express.json())

const port = process.env.PORT || 8000

// Connect to MongoDB before starting the server
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB")
    app.listen(port, () => {
      console.log(`Server running on port: ${port}`)
    })
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message)
  })
