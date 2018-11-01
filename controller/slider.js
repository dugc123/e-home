const {Router} = require("express")
const router = Router()
const sliderModel = require("../database/slider.js")
const auth = require("./auth")

router.post("/add", auth,(req, res, next) => {
    const {title,img,url,isShow,sort} = req.body

    sliderModel.create({title,img,url,isShow,sort}).then(data=>{
        res.json({
            data,
            code:200,
            msg: "轮播图插入成功"
        })
    }).catch(err=>{
        const error = new Error(err)
        next(error)
    })
    
})

//获取全部轮播图
router.get("/get", async (req, res) => {
    let {page = 1,pageSize=10} = req.body
    page=parseInt(page)
    pageSize = parseInt(pageSize)

        const count= await sliderModel.count()
       const sliderList = await sliderModel.find().limit(pageSize).skip((page - 1) * pageSize).sort({
            sort: 1,
            _id: -1
        }).populate({
            path: "url"
        })
            res.json({
                data:sliderList,
                code:200,
                msg:"success",
                count
        }).catch(err=>{
            new Error(err)
            next(err)
        })
})

//获取单条轮播图
router.get("/get/:id", (req, res) => {
        const {id} = req.params

        sliderModel.findById(id).populate({path:"url"}).then(data=>{
            res.json({
                data,
                code:200,
                msg:"success"
            })
        }).catch(err=>{
            new Error(err)
            next(err)
        })
})

router.post("/update/:id", auth,(req, res, next) => {
    const {id} = req.params
    const {title,img,url,isShow,sort} = req.body
    sliderModel.update({_id:id},{$set:{title,img,url,isShow,sort}}).then(data=>{
        res.json({
            data,
            code:200,
            msg:"更新成功"
        })
    }).catch(err=>{
        new Error(err)
        next(err)
    })
})

router.post("/del/:id", auth,(req, res, next) => {
    const {id} = req.params
    sliderModel.remove({_id:id}).then(data=>{
        console.log(data)
        if (id) {
            res.json({
                data:"success",
                code:200,
                msg:"删除成功"
            })
        }else{
            res.json({
                data:"不存在的id",
                code:200,
                msg:"该id不存在或者已被删除"
            })
        }
    }).catch(err=>{
        new Error(err)
        next(err)
    })
})

module.exports = router