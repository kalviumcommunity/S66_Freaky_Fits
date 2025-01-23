const express = require('express')
const app =express()

app.get("/ping",(req,res)=>{
    res.send("Pong")
})

const PORT=8080
app.listen(PORT,()=>{
    console.log(`listening on the ${PORT}`)
})