const express = require("express")

const connectDB = require("./config.js")
const authRoutes = require("./routes/authRoutes.js")
const serviceRoutes = require("./routes/serviceRoutes")
const app = express()
const port = 5000

connectDB()

// middleware

app.use(express.json())


app.get("/", (req, res) => {
    res.send("Hello World")
})

app.use("/api/auth", authRoutes)
app.use("/service", serviceRoutes)


app.listen(port, () => {
    console.log(`server is running on port: ${port}`)
})