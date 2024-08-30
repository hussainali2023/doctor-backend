require("dotenv").config()
const express = require("express")
const cors = require('cors')
const connectDB = require("./config.js")
const cookieParser = require("cookie-parser")
const authRoutes = require("./routes/authRoutes.js")
const serviceRoutes = require("./routes/serviceRoutes")
const bookingRoutes = require("./routes/bookingRoutes.js")
const newUserRoutes = require("./routes/newUserRoutes.js")
const productRoutes = require("./routes/productRoutes.js")


const app = express()
const port = 5000

connectDB()

// middleware

app.use(express.json())
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))



app.get("/", (req, res) => {
    res.send("Hello World")
})

app.use("/api/auth", authRoutes)
app.use("/api/services", serviceRoutes)
app.use("/api/bookings", bookingRoutes)
app.use("/api/auth/new", newUserRoutes)
app.use("/api/products", productRoutes)


app.listen(port, () => {
    console.log(`server is running on port: ${port}`)
})


