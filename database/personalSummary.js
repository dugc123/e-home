const mongoose = require("mongoose")

const personalSummary = new mongoose.Schema({
    discussId: {
        type: String,
    },
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        index: true, //建立索引，提高查询速度
        ref:"user"
    },
    pic: {
        type: mongoose.SchemaTypes.ObjectId,
        ref:"topic"
    },
    // common: [{ //存放其他用户评议的数组
    //     evaluate:{
    //         type:Number,
    //         default:0
    //     },
    //     otherUserId:{
    //         type:String,
    //         required:true
    //     }
    // }]
    common:{
        type:Array
    }
}, {
    versionKey: false,
    timestamps: {
        createdAt: 'created-time',
        updatedAt: "update-time"
    }
})
module.exports = mongoose.model("personalSummary", personalSummary)