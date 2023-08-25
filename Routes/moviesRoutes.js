const express = require('express')
const {gatAllMovies,createMovie,getMovie,updateMovie,deleteMovie}=require('../controllers/moviesController.js')
const router = express.Router()

/* router.param('id',checkidParams) */

router.route('/')
   .get(gatAllMovies)
   .post(createMovie)

router.route('/:id/:name?')
   .get(getMovie)
   .patch(updateMovie)
   .delete(deleteMovie)
module.exports=router
