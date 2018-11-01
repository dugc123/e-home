const {Router} = require("express");
const router = Router();
const personalSummary = require("../database/personalSummary")
const auth = require("./auth")

//用户上传个人总结
router.post("/add",(req,res,next)=>{
    let {pic,discussId,common} = req.body
    let userId = req.session.user._id

    personalSummary.findOne({discussId,userId}).then(dt=>{
        //去重查询
        // if (dt == null) {
            personalSummary.create({pic,discussId,userId,common}).then(data=>{
                res.json({
                    data,
                    code:200,
                    msg:"个人总结上传成功"
                })
            }).catch(err=>{
                next(new Error(err))
            })
        // }else{
        //     res.json({
        //         data:"不能重复提交个人总结",
        //         code:400,
        //         msg:"不能重复提交个人总结"
        //     })
        // }
    })
})
//获取个人总结
router.get("/get",auth, async (req,res,next)=>{
    let {page=1,pageSize=10} = req.body
    page=parseInt(page)
    pageSize=parseInt(pageSize)
    let count = await personalSummary.count()
    let personalSummaryList = await personalSummary
    .find().limit(pageSize).skip((page-1)*pageSize)
    .sort({_id:-1})
    .populate({
        path: "userId",
        select: "username userId -_id"
    }).populate({
        path: "pic",
        select:"content -_id"
    })
    res.json({
        code : 200,
        msg:"获取个人总结成功",
        data: personalSummaryList,
        count
    }).catch(err=>{
        next(err)
    })
})
module.exports = router;