const {Router} = require("express");
const router = Router();
const personalSummary = require("../database/personalSummary")

//用户上传个人总结
router.post("/add",(req,res,next)=>{
    let {pic,discussId} = req.body
    let userId = req.user.id

    personalSummary.findOne({discussId,userId}).then(dt=>{
        //去重查询
        if (dt == null) {
            personalSummary.create({pic,discussId,userId,common:[]}).then(data=>{
                res.json({
                    data:"success",
                    code:200,
                    msg:"success"
                })
            }).catch(err=>{
                next(new Error(err))
            })
        }else{
            res.json({
                data:"不能重复提交个人总结",
                code:400,
                msg:"不能重复提交个人总结"
            })
        }
    })
})

module.exports = router;