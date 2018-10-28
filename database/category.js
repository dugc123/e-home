const mongoose = require("mongoose")

const newsCategory = new mongoose.Schema({
    label:{
        type:String
    },
    value:{
        type:String
    }
},{versionKey:false,timestamps:{ createdAt: 'created-time',updatedAt:"update-time"}})
module.exports = mongoose.model("newsCategory", newsCategory)