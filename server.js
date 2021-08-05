const express = require('express');

const app = express();
const dotenv = require('dotenv')
dotenv.config({path: 'config.env'})
const PORT = process.env.PORT || 3000
const morgan = require('morgan');
const path = require('path');
const connectDB = require('./server/database/connection')

//mongodb connection
connectDB()

//morgan allows us to log request
app.use(morgan('tiny'))
//other middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//specify the view engine
app.set("view engine", "ejs")

//load my assets folder
app.use('/css', express.static(path.resolve(__dirname,"assets/css")))
app.use('/img', express.static(path.resolve(__dirname,"assets/img")))
app.use('/js', express.static(path.resolve(__dirname,"assets/js")))

//css/style.css in order to use the css file

//upload route
app.use('/', require('./server/routes/router'))


app.get('/', (req, res) =>{
    res.send("This app is working well.")
})
app.listen(PORT, () =>{
    console.log(`Server listening on port ${PORT}`)
})