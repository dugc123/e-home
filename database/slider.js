const mongoose = require("mongoose")

const slider = new mongoose.Schema({
    title:{
        type:String
    },
    url:{
        type: mongoose.SchemaTypes.ObjectId,
        ref:"news",
        required:true
    },
    sort:{
        type:Number,
        default:1
    },
    img:{
        type:String
    },
    isShow:{
        type:Number,
        default:0
    }
},{versionKey:false,timestamps:{ createdAt: 'created-time',updatedAt:"update-time"}})
module.exports = mongoose.model("slider", slider)
