const mongoose=require("mongoose");

mongoose.connect('mongodb://localhost:27017/library');

const Schema=mongoose.Schema;

const userSchema=new Schema({
 email:{
    type:String,
    required:true,
    unique:true,
},
 username:{
    type: String,
    required: true,
    unique:true,
},
 password:{
       type:String,
       required: true,
       unique:true,
        },
});

var Userdata = mongoose.model('User',userSchema);
module.exports = Userdata;

 