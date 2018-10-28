const mongoose = require("mongoose")

const news = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    type:{
        type:mongoose.SchemaTypes.ObjectId,
        ref: "newsCategory"
    },
    img:{
        type:String
    },
    content:{
        type:String
    },
    contentText: {
        type:String
    },
    author:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "user"
    },
    look_number:Number
},{versionKey:false,timestamps:{ createdAt: 'created-time',updatedAt:"update-time"}})
module.exports = mongoose.model("news", news)