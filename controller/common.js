const {Router} = require("express");
const router = Router();
const topicModel = require("../database/topic")
const auth = require("./auth")
const commonModel = require("../database/common")
router.post('/add', auth, async (req, res, next) => {
    try {
        const {
            content,
            topic_id
        } = req.body
        const userId = req.session.user._id

    let common
    const topic = await topicModel.findById(topic_id) //查找主题
    if (topic) {
        common = await commonModel.create({content,user:userId,topic:topic_id})
           await topicModel.update({$push:{common:common._id}})
            res.json({
                code: 200,
                msg: "添加评论成功",
                data: common
            })
    }else{
        res.json({
                code:400,
                msg:"没有该主题"
        })

    }

    } catch (error) {
        next(error)
    }
})

router.get('/get', async (req, res, next) => {
    let {
        page = 1, page_size = 10
    } = req.query
    page = parseInt(page)
    page_size = parseInt(page_size)

    const count = await commonModel.count()
    let dataList = await commonModel.find().skip((page - 1) * page_size).limit(page_size).sort({
        _id: -1
    }).populate({
        path: "user",
        select: "-password"
    })
    res.json({
        code: 200,
        msg: "获取成功",
        data: dataList,
        count
    })
})

router.get('/get/:topicId', async (req,res,next)=>{
    try {
        const topicId = req.params.topicId
        let dataList = await commonModel.find({topic:topicId}).populate({path:"user",select:"username avatar"})
        res.json({
            code:200,
            msg:"获取成功",
            data:dataList
        })
    } catch (error) {
        next((error))
    }
})
module.exports = router;