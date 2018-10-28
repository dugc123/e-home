const {Router} = require("express")
const router = Router()

const invitation = require("../database/invitation")

// 用户发起一条帖子
router.post("/add",(req,res,next)=>{
    // console.log(123)
    let {content} = req.body
    let {id,avatar,name} = req.user
    // console.log(123456)
    invitation.create({
        content,
        userId:id,
        userAvatar:avatar,
        userName:name
    }).then(data=>{
        res.json({
            data:"success",
            code:200,
            msg:"success"
        })
    }).catch(err=>
        new Error(err))
})


//获取帖子列表
router.get("/get",(req,res,next)=>{
    let {page=1,pageSize=10,id} = req.query
    if (!id) {
        invitation.findOne({idParent:0}).sort({_id:-1})
        .limit(pageSize).skip((page-1)*pageSize).then(data=>{
            res.json({
                data,
                code:200,
                msg:"success"
            })
        })
    }else{
        invitation.findOne({_id:id}).then(data=>{
            res.json({
                data,
                code:200,
                msg:"success"
            })
        })
    }
})

//用户回复一条帖子
router.post("/reply", (req, res, next) => {
    let {
        parentId,
        content,
        toUserId,
        toUserName,
        toAvatar
    } = req.body;
    let {
        id,
        avatar,
        name
    } = req.user;

    invitation.findOne({
            $or:[
                    {_id: parentId, userId: toUserId},
                    {parentId, userId: toUserId}
                ]
        }).then(dt => {
        console.log(dt)
        if(dt == null||dt.userName!=toUserName||dt.userAvatar!=toAvatar){
            res.json({
                data: "非法参数",
                code: 400,
                msg: "非法参数"
            })
            return
        }

        invitation.create({
            isParent: 1,
            parentId,
            content,
            toUserId,
            toUserName,
            toAvatar,
            userId: id,
            userAvatar: avatar,
            userName: name
        }).then(data => {
            res.json({
                data: "success",
                code: 200,
                msg: "success"
            })
        }).catch(err => new Error(err))
    })
})

//获取该帖子的回复
router.get("/getInvitation", (req, res, next) => {
    let {id, page=1, pageSize=10} = req.query;

    invitation.find({parentId: id})
        .limit(pageSize)
        .skip((page-1)*pageSize)
        .then(data => {
            res.json({
                data,
                code: 200,
                msg: "success"
            })
        })
})

module.exports = router;