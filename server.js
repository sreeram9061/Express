const dotenv=require('dotenv')
const mongoose=require("mongoose")

//load the environment variable 
dotenv.config({path:'./config.env'})

const app=require('./app');


//connecting node js in to remote DB || local DB
mongoose.connect(process.env.CON_STR,{
    useNewUrlParser:true
}).catch((e)=>{
    throw e
})

//create a server
const PORT= process.env.PORT || 4000;
app.listen(PORT,'127.0.0.1',()=>{
    console.log('server has started...');
})