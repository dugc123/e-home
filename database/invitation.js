const mongoose = require("mongoose");

const invitation = new mongoose.Schema({
    isParent: {
        type: Number,
        default: 0,
        index: true
    },
    userId: {
        type: String
    },
    userAvatar: {
        type: String
    },
    userName: {
        type: String
    },
    toUserId: {
        type: String
    },
    toUserName: {
        type: String
    },
    toUserAvatar: {
        type: String
    },
    parentId: {
        type: String,
        default: ""
    },
    content: {
        type: String
    }
}, {
    versionKey: false,
    timestamps: {
        createAt: "createTime",
        updateAt: "updateTime"
    }
})

module.exports = mongoose.model("invitation", invitation)