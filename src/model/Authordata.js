// Accesing mongoose package
const mongoose = require('mongoose');

// Database connection
mongoose.connect('mongodb://localhost:27017/library');


// Schema definition
const SchemaAuth = mongoose.Schema;


const Authorschema = new SchemaAuth({
    title: String,
    author: String,
    genre: String,
    image: String
});

// MOdel creation

var Authordata = mongoose.model('authordata',Authorschema);


module.exports = Authordata;