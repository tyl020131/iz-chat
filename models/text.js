const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const text = new Schema({
    user:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }
},{timestamps:true});

const Text = mongoose.model('Text',text);
module.exports = Text;