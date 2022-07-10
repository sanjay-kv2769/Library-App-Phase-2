const express = require('express'); //requiring express module
const adminauthRouter = express.Router(); //creating router for adminrouter
const Authordata = require('../model/Authordata');



function authrouter(nav){
    adminauthRouter.get('/',function(req,res){
    res.render('addAuthor',{
        nav,
        title: 'Library'
    })
})


adminauthRouter.post('/addauth',function(req,res){
// post method
    var items = {
        author: req.body.author,
        genre: req.body.genre,
        title: req.body.title,
        image: req.body.image
    }
    

    var author = Authordata(items);
    author.save();//saving to database
    res.redirect('/authors');


    res.send("Hey I'm added");
});



return adminauthRouter;
}



module.exports = authrouter;

