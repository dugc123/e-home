const mongoose = require("mongoose")

const common = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "user"
    },
    content: { 
        type: String
    },
    topic: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "topic"
    }]
}, {
    versionKey: false,
    timestamps: {
        createdAt: 'created-time',
        updatedAt: "update-time"
    }
})
module.exports = mongoose.model("common", common)