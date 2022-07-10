const express = require('express');
const bcrypt = require('bcryptjs');
const loginRouter = express.Router();
const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session);
const mongoose = require("mongoose");

const Userdata = require('../model/Userdata');

const mongoURI = "mongodb://localhost:27017/library"
loginRouter.use(express.urlencoded({extended:true}));




mongoose.connect(mongoURI,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useunifiedTopology: true
})
.then((res)=>{
    // console.log("MongoDB Connected");
   });

const store = new MongoDBSession({
    uri: mongoURI,
    collection: "mySessions",

});





function router(nav){

    var books = [
        {
            title: 'Tom and Jerry',
            author:'Joseph Barbera',
            genre:'Cartoon',
            img:"Tom.jpg"
        },
        {
            title: 'Harry Potter',
            author:'J K Rowling',
            genre:'Fantasy',
            img:"Harry.jpg"
        },
        {
            title: 'Pathumayude Aadu',
            author:'Basheer',
            genre:'Drama',
            img:"basheer.jpg"
        }
    ]



    loginRouter.use(
        session({
            secret: "Key that will sign cookie",
            resave: false,
            saveUninitialized: false,
            store: store,
        })
    );

    const isAuth = (req, res, next) => {
        if(req.session.isAuth){
            next()
        } else{
            res.redirect('/login')
        }
    };


    // 2nd router method
    loginRouter.get('/',function(req,res){
        req.session.isAuth = true;
        console.log(req.session);
        console.log(req.session.id);
        res.render("login",{
            // nav:[{link:'/books',name:'Books'},{link:'/authors',name:'Authors'}],
            nav,
            title:'Library',
            books
        });


        loginRouter.post("/userlog", async (req, res)=>{
                // alert("log working");

            const { email, password } = req.body;
       
        const user = await Userdata.findOne({email});

        if(!user) {
            return res.redirect('/login');
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.redirect("/login");
        }
        req.session.isAuth = true;
        res.redirect("/books");
    });
        loginRouter.get("/books", isAuth,(req, res) => {
            res.render("books");
    });

    });



    return loginRouter;
}


module.exports = router;

