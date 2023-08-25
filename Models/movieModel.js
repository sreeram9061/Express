const mongoose=require("mongoose")

//creating Document modell
const movieSchema= new mongoose.Schema({
    name:{
        type:String,
        require:[true,'name is required field'],
        unique:true,
        trim:true
    },
    description:String,
    duration:{
        type:Number,
        required:[true,'Duration is required field'],
        trim:true
    },
    reating:{
        type:Number,
    },
    totalRating:{
        type:Number,

    },
    releaseYear:{
        type:Number,
        required:[true,'Release year is required field']
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    genres:{
        type:[String],
        required:[true,'genres is required field'],
    },
    coverImage:{
        type:String,
        required:[true,'coverimage is required field']
    },
    actors:{
        type:[String],
        require:[true,'actors is required field']
    },
    price:{
        type:Number,
        require:[true,'price is required field']
    }
})

// this "Movie" is the model of the document
const Movie=mongoose.model('movie',movieSchema)
module.exports=Movie;