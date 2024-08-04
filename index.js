import express from "express"
const app = express()
const port = 5000

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.get("/hello", (req, res) =>{
    res.send("<h1>Hello</h1>")
})

app.listen(port, ()=>{
    console.log(`server is running on port: ${port}`)
})