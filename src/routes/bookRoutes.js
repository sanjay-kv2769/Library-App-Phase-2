const express = require('express');
const booksRouter = express.Router();
const Bookdata = require('../model/Bookdata');
function router(nav){

    // var books = [
    //     {
    //         title: 'Tom and Jerry',
    //         author:'Joseph Barbera',
    //         genre:'Cartoon',
    //         img:"Tom.jpg"
    //     },
    //     {
    //         title: 'Harry Potter',
    //         author:'J K Rowling',
    //         genre:'Fantasy',
    //         img:"Harry.jpg"
    //     },
    //     {
    //         title: 'Pathumayude Aadu',
    //         author:'Basheer',
    //         genre:'Drama',
    //         img:"basheer.jpg"
    //     }
    // ]


    
    // 2nd router method
    booksRouter.get('/',function(req,res){
            Bookdata.find()
            .then(function(books){
                res.render("books",{
                    // nav:[{link:'/books',name:'Books'},{link:'/authors',name:'Authors'}],
                    nav,
                    title:'Library',
                    books
                });
            })
            
    });
    
    
    // booksRouter.get('/single',function(res,res){
    //     res.send("Hey Iam a Single Book");
    // });
    
    booksRouter.get('/:id',function(req,res){
        const id = req.params.id
        Bookdata.findOne({_id: id})
        .then(function(book){
            res.render('book',{
                // nav:[{link:'/books',name:'Books'},{link:'/authors',name:'Authors'}],
                nav,
                title:'Library',
                book
            });
        })
        
    });
    return booksRouter;
}


module.exports = router;

