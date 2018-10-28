const mongoose = require("mongoose")

const discuss = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    status: { //民主评议的状态。0为新添加的，尚未开启的。1为已经开启，2为已经关闭的
        type:Number,   
        default:0
    },
    img:{
        type:String
    },
    isShow:{
        type:Boolean,
        default:false
    }
},{versionKey:false,timestamps:{ createdAt: 'created-time',updatedAt:"update-time"}})
module.exports = mongoose.model("discuss", discuss)