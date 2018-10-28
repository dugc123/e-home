const mongoose = require("mongoose")

const user = new mongoose.Schema({
    avatar:{
        type:String,
        default: "http://pbl.yaojunrong.com/icon_default.png"
    },
    username: {
            type: String,
            require: true,
            unique:true
        },
        nickname: {
                type: String
            },
        password: { //密码
            type: String,
            require: true
        },
        desc: { //描述
            type: String
        },
        job: { 
            type: Number
        },
        phone: { 
            type: String
        },
        sex: { // 性别  。男性1，女性0默认为男
            type: Number,
            default: 1
        }
    }, {
        versionKey: false
    })

    module.exports = mongoose.model("user", user)