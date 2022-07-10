const express = require('express');
const authorsRouter = express.Router();
const Authordata = require('../model/Authordata');
function router(nav){

    // var books = [
    //     {
    //         title: 'Tom and Jerry',
    //         author:'Joseph Barbera',
    //         genre:'Cartoon',
    //         img:"josephbarbera.jpg",
    //         para:"Joseph Roland Barbera was an American animator, director, producer, storyboard artist, and cartoon artist, who co-founded the animation studio and production company Hanna-Barbera. Born to Italian immigrants in New York City, Barbera joined Van Beuren Studios in 1927 and subsequently Terrytoons in 1929."
    //     },
    //     {
    //         title: 'Harry Potter',
    //         author:'J K Rowling',
    //         genre:'Fantasy',
    //         img:"jkrowling.jpg",
    //         para:"Joanne Rowling CH OBE HonFRSE FRCPE FRSL, also known by her pen name J. K. Rowling, is a British author and philanthropist. She wrote a seven-volume children's fantasy series, Harry Potter, published from 1997 to 2007."
    //     },
    //     {
    //         title: 'Pathumayude Aadu',
    //         author:'Basheer',
    //         genre:'Drama',
    //         img:"basheer2.png",
    //         para:"Vaikom Muhammad Basheer was a writer of Malayalam literature. He was a writer, humanist, freedom fighter, novelist and short story writer, noted for his path-breaking, down-to-earth style of writing that made him equally popular among literary critics as well as the common man."
    //     }
    // ]
    // 2nd router method
    authorsRouter.get('/',function(req,res){
        Authordata.find()
        .then(function(books){
            res.render("authors",{
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
    
    authorsRouter.get('/:iv',function(req,res){
        const iv = req.params.iv
        Authordata.findOne({_iv: iv})
        .then(function(book){
            res.render('author',{
                // nav:[{link:'/books',name:'Books'},{link:'/authors',name:'Authors'}],
                nav,
                title:'Library',
                book
            });
        })

        });
        
    return authorsRouter;
}


module.exports = router;

