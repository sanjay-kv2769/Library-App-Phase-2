// Accesing mongoose package
const mongoose = require('mongoose');

// Database connection
mongoose.connect('mongodb://localhost:27017/library');


// Schema definition
const Schema = mongoose.Schema;
// const SchemaAuth = mongoose.Schema;

const BookSchema = new Schema({
    title: String,
    author: String,
    genre: String,
    image: String
});



var Bookdata = mongoose.model('bookdata',BookSchema);





module.exports = Bookdata;