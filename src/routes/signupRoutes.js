const express = require('express');
const bcrypt = require('bcryptjs');
const signupRouter = express.Router();
const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session);
const mongoose = require("mongoose");
const isAuth = require('../middleware/is-auth');
const Userdata = require('../model/Userdata');
// const UserModel = require("..model/Userdata");
const mongoURI = "mongodb://localhost:27017/library"

signupRouter.use(express.urlencoded({extended:true}));
// signupRouter.use('/login',signupRouter);



mongoose.connect(mongoURI,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useunifiedTopology: true
})
.then((res)=>{
    console.log("MongoDB Connected");
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



    signupRouter.use(
        session({
            secret: "Key that will sign cookie",
            resave: false,
            saveUninitialized: false,
            store: store,
        })
    )

    // const isAuth = (req, res, next) => {
    //     if(req.session.isAuth){
    //         next()
    //     } else{
    //         res.redirect('/login')
    //     }
    // };


    // 2nd router method
    signupRouter.get('/',function(req,res){
        req.session.isAuth = true;
        console.log(req.session);
        console.log(req.session.id);
        res.render("signup",{
            // nav:[{link:'/books',name:'Books'},{link:'/authors',name:'Authors'}],
            nav,
            title:'Library',
            books
        });


        signupRouter.post("/useradd", async (req,res)=> {
            const {email, username, password} = req.body;
            
            let user = await Userdata.findOne({email});

            if(user){
                return res.redirect('/login');
            }

            const hashedPsw = await bcrypt.hash(password, 12);

            user = new Userdata({
                email,
                username,
                password: hashedPsw,
            });
            await user.save();
            res.redirect("/login");

        });

    });



    return signupRouter;
}

module.exports = router;

