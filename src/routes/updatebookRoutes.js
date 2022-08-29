const express = require('express'); //requiring express module
const updatebookRouter = express.Router(); //creating router for adminrouter
const Bookdata = require('../model/Bookdata');

function router(nav){

    updatebookRouter.get('/',function(req,res){
        Bookdata.find()
        .then(function(books){
            res.render("updatebook",{
                nav,
                title:'Library',
                books
            });
        })
        
    });

    updatebookRouter.get('/:id',(req,res, next) => {
        console.log(req.params.id);
        Bookdata.findOneAndUpdate({_id: req.params.id}, req.body, {new:true}, (err, docs)=>{
            if(err){
                console.log("can't retrieve and edit ");
            }else{
                res.render('updatebook' , {Bookdata:docs});
            }
        })   
    });







    return updatebookRouter;
}


module.exports = router; 


