const {Router} = require("express")
const router = Router()
const discuss = require("../database/discuss.js")

//添加一个民主评议
router.post("/add",(req,res,next)=>{
    const {title,desc} = req.body
    if (req.user.level.type == 0) {
            discuss.create({
            title,
            desc
        }).then(data => {
        res.json({
            data:"添加成功",
            code:200,
            msg:"success"
        })
    }).catch(err=>{
        const error = new Error(err)
        next(error)
    })
    }else{
        res.json({
            data:"该操作需要管理员",
            code:400,
            msg:"该操作需要管理员"
        })
    }
    })

//修改民主评议
router.post("/updateStatus",(req,res,next)=>{
    let{status,id} = req.body
    status = parseInt(status)
    if (status && status == 1) { //开启一个民主评议
        discuss.findOne({status}).then(dt=>{
            if (dt == null) {
                discuss.update({_id:id},{$set:{status}}).then(data=>{
                    res.json({
                        data:"民主评议开启成功",
                        code:200,
                        msg:"民主评议开启成功"
                    })
                })
            }else{
                res.json({
                    data:"已经有一个开启的民主评议了",
                    code:400,
                    msg:"已经有一个开启的民主评议了"
                })
            }
        })
    }else if(status && status == 2){ //关闭一个民主评议
        discuss.update({_id:id},{$set:{status}}).then(data=>{
            res.json({
                data:"评议结束成功",
                code:200,
                msg:"评议结束成功"
            })
        }).catch(err=>{
            next(new Error(err))
        })
    }
})

//用户获取参加民主评议的人员
router.get("/getEnterPeople", (req, res, next) => { //用户获取参加民主评议的人员
    let {page =1 ,pageSize =10,branchId} = req.body
    if (req.user.level.type == 1) {
        user.findOne({branchId},{pwd:0,level:0,isCanLogin:0}).sort({_id:-1}).limit(pageSize).
        skip((page-1)*pageSize).then(data=>{
            res.json({
                data,
                code:200,
                msg:"success"
            })
        }).catch(err=>{
            next(new Error(err))
        })
    }
})

module.exports = router