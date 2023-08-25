const express =require('express')
const morgan = require('morgan');
const router = require("./Routes/moviesRoutes.js")

let app=express();

app.use(express.json())

if(process.env.NODE_ENV == 'development') {
    app.use(morgan('dev'))
}

app.use((req,res,next)=>{
    req.date= new Date().toISOString();
    next();
})

app.use('/api/v1/movies',router)
module.exports=app;