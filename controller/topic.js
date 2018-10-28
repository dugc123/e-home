const {Router} = require("express");
const router = Router();
const topicModel = require("../database/topic")
const auth = require("./auth")

router.post('/add',auth,async(req,res,next)=>{
    try {
        const {content} = req.body
        const userId = req.session.user._id

        const topicList = await topicModel.create({
            user:userId,
            content
        })
        res.json({
            code:200,
            msg:"创建成功",
            data: topicList
        })
    } catch (error) {
        next(error)
    }
})

router.get('/get',async(req,res,next)=>{
    let {page=1,page_size=10} = req.query
    page = parseInt(page)
    page_size = parseInt(page_size)

    const count = await topicModel.count()
    let dataList = await topicModel.find().skip((page - 1) * page_size).limit(page_size).sort({
            _id: -1
        }).populate({
        path:"user",
        select:"username avatar"
    })
    res.json({
        code:200,
        msg:"获取成功",
        data:dataList,
        count
    })
})
module.exports = router;