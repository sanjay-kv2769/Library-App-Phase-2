const express = require('express'); //requiring express module
const adminRouter = express.Router(); //creating router for adminrouter
const Bookdata = require('../model/Bookdata');


function router(nav){
    adminRouter.get('/',function(req,res){
    res.render('addBook',{
        nav,
        title: 'Library'
    })
})

// Add Book
adminRouter.post('/add',function(req,res){
    
// post method
    var item = {
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    image: req.body.image
    }
    
    var book = Bookdata(item);
    book.save();//saving to database
    res.redirect('/books');


});



return adminRouter;
// return adminauthRouter;
}

module.exports = router; 


