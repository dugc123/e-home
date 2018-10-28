const mongoose = require("mongoose")

const topic = new mongoose.Schema({
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"user"
    },
    content:{
        type:String,
        required:true
    },
    common:[
        {
            type:mongoose.SchemaTypes.ObjectId,
            ref:"common"
        }
    ]
}, {
    versionKey: false,
    timestamps: {
        createdAt: 'created-time',
        updatedAt: "update-time"
    }
})
module.exports = mongoose.model("topic", topic)