const {Router} = require("express")
const router = Router()

const userModel = require("../database/user.js")
const tokenConfig = require("../config/tokenConfig")
const jwt = require("jsonwebtoken")
const auth = require("./auth")
//创建用户
router.post("/add", auth, (req, res, next) => {
    // let token = req.header.token || req.body.token || req.query.token
    // jwt.verify(token,tokenConfig.secret,(err,decode)=>{
    //     if (err) {
    //         res.status(401).send("登录状态失效，请重新登录")
    //         return
    //     }
            let{
                avatar,
                username,
                nickname,
                sex,
                password,
                phone,
                desc,
                job
            } = req.body

            userModel.findOne({username}).then(dt=>{
                if (dt == null) {
                    userModel.create({
                        avatar,
                        username,
                        nickname,
                        sex,
                        password,
                        phone,
                        desc,
                        job
                    }).then(data=>{
                        res.json({
                            data,
                            code:200,
                            msg:"用户添加成功"
                        })
                    }).catch(err=>{
                        let error = new Error(err)
                        next(error)
                    })
                }else{
                    res.json({
                        data:"用户名已存在",
                        code:400,
                        msg:"用户名已存在"
                    })
                }
            }).catch(error=>{
                next(new Error(error))
            })
    // })
})
//用户登录操作
router.post("/login",async(req, res, next) => {
    try {
        let {username,password} = req.body
    if (username && password) {
        const user = await userModel.findOne({username})
        if (user) { //判断有没有这个用户
            if (password == user.password) {
                req.session.user = user   //将用户的信息存到session中
                res.json({
                    data: req.body,
                    code: 200,
                    msg: "登录成功"
                })
            }else{
                res.json({
                    code:401,
                    msg:"密码错误"
                })
            }
        }else{
            res.json({
                code:401,
                msg:"用户名不存在"
            })
        }
    }else{
        res.json({
           code:400,
           msg:"缺少必要参数"
        })
    }
    } catch (error) {
        next(error)
    }
  

    // user.findOne({idCardNumber}).then(data=>{
    //     if (data==null) {
    //         res.json({
    //             data:"用户名不存在",
    //             code:400,
    //             msg:"false"
    //         })
    //         return
    //     }
    //     if (data.pwd === pwd) {
    //         let userInfo = {
    //             id:data._id,
    //             name:data.userName,
    //             idCardNumber:data.idCardNumber,
    //             level:data.level
    //         }
    //         let token = jwt.sign(userInfo,tokenConfig,secret,{expiresIn:tokenConfig.exp()})
    //         res.json({
    //             data:token,
    //             code:200,
    //             msg:"success"
    //         })
    //     }else{
    //         res.json({
    //             data:"用户名或密码错误",
    //             code:400,
    //             msg:"用户名或密码错误"
    //         })
    //     }
    // }).catch(err=>{
    //     let error = new Error(err)
    //     next(error)
    // })
})

//管理员重置密码

router.post("/updateMore",(req,res,next)=>{
    let {users} = req.body
    console.log(users)
    userModel.update({_id:{$in:users}},{pwd:"123456"},{multi:true}).then(data=>{
        if (data.n == users.length) {
            res.json({
                data:"批量重置密码成功",
                code:200,
                msg:"批量重置面成功"
            })
        }
    })
    
})
//普通用户获取个人信息
router.get("/getUserInfo",auth , async(req,res,next)=>{
    try {
        let {page =1 ,pageSize=10} = req.query
        page=parseInt(page)
        pageSize = parseInt(pageSize)
        
        const count = await userModel.count()
        const dataList = await userModel.find().skip((page-1)*pageSize)
        .limit(pageSize).sort({_id:-1}).select("-password")
        res.json({
            code :200,
            data:dataList,
            msg:"获取管理员成功",
            count
        })
    } catch (error) {
        next(error)
    }
    })

router.post("/delete/:id",auth,(req,res,next)=>{
    const {id} = req.params;
    userModel.remove({_id: id}).then(data => {
        if (id) {
            res.json({
                data: "success",
                code: 200,
                msg: "删除管理员成功"
            })
        }
        else {
            res.json({
                data: "不存在的id",
                code: 400,
                msg: "不存在的id"
            })
        }
    }).catch(err => {
        new Error(err);
        next(err)
    })
})

module.exports = router;