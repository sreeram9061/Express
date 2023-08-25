const Movie= require("../Models/movieModel.js")

const errorHandle=(err,res)=>{
    res.status(404).json({
        status:'faild',
        message:err.message
    })

}

exports.gatAllMovies= async (req,res)=>{
    try{
        const excludeFields=['sort','page','limit','fields']
        /* helo */
        let dataFiealdObj={...req.query}
        excludeFields.forEach((item)=>{
            if(dataFiealdObj.hasOwnProperty(item)) delete dataFiealdObj[item]
        })

        
        let queryString = JSON.stringify(dataFiealdObj);
        let queryObj = JSON.parse(queryString.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`));
        let query = Movie.find(queryObj);
    
        if (req.query.sort) {
            //removing , from the sort strng in multipile sort querys
            const sortBy=req.query.sort.split(',').join(' ')
            query = query.sort(sortBy);
        }else{
            query = query.sort("-releaseYear")
        }

        if(req.query.fields){
            const fields = req.query.fields.split(',').join(' ')
            query= query.select(fields)
        }else{
            query= query.select("-description -__v")
        }

        //page nations
        const page = +req.query.page || 1
        const limit = +req.query.limit || 3 
        let skip = (page-1)* limit;

        query = query.skip(skip).limit(limit)

        if(req.query.page){
            if(skip>= await Movie.countDocuments()){
                throw new Error("this page is not exist")
            }
        }
 
        

        let movies = await query;

        res.status(200).json({
            status: 'success',
            page:page,
            length: movies.length,
            data: {
                movies:movies
            }
        });

    }catch(er){
        errorHandle(er,res)
    }
}

exports.getMovie= async(req,res)=>{
    try{
        const movie= await Movie.findById(req.params.id)
        res.status(200).json({
            status:'success',
            data:{
                movie
            }
        })
    }catch(er){
        errorHandle(er,res)
    }

}

exports.createMovie= async (req,res)=>{
    /*const testMovie= new Movie({})
    testMovie.save()*/
    try{
        const movie= await Movie.create(req.body)
        res.status(201).json({
            status:'success',
            data:{
                movie 
            }
        })
    }catch(er){errorHandle(er,res)}   
}

exports.updateMovie= async (req,res)=>{
    try{
        const updatedMovies= await Movie.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        res.status(200).json({
            status:'success',
            data:{
                movie:updatedMovies
            }
        })
    }catch(er){
        errorHandle(er,res)
    }

}
exports.deleteMovie= async(req,res)=>{
    try{
        await Movie.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status:'success',
            data:null
        })
    }catch(er){
        errorHandle(er,res)
    }

}

