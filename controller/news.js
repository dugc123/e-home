const {Router} = require("express")
const router = Router()

const newsModel = require("../database/news.js")
const auth = require("./auth")

router.post("/add",auth,(req,res,next)=>{
    const {title,type,img,content,contentText,author,look_number} = req.body
    
    newsModel.create({title,type,img,content,author,contentText,look_number}).then(data=>{
        res.json({
            code:200,
            data,
            msg:"新闻创建成功"
        })
    }).catch(err=>{
        new Error(err)
        next(err)
    })
})

router.get("/get", async (req, res, next) => {
    let {page=1, pageSize=10} = req.body;
    page = parseInt(page);
    pageSize = parseInt(pageSize);
    const count = await newsModel.count()
    const news = await newsModel.find()
        .limit(pageSize)
        .skip((page - 1) * pageSize)
        .sort({
                _id: -1
            }).populate({
                path: "author",
                select: "-password"
            }).populate({
                path: "type"
            })

            res.json({
                data:news,
                code: 200,
                msg: "获取新闻成功",
                count
            }).catch(err => {
            new Error(err)
            next(err)
        })
})

//获取单条新闻
router.get("/get/:id", (req, res, next) => {
    const {id} = req.params

    newsModel.findById(id).populate({
        path: "user",
        select: "-password"
    }).populate({
        path: "newsCategory"
    }).then(data => {
        res.json({
            data,
            code: 200,
            msg: "获取新闻成功"
        })
    }).catch(err => {
        new Error(err)
        next(err)
    })
})

//更新一条新闻
router.post("/update/:id",(req,res,next)=>{
    const id = req.params.id
    const{title,type,img,content,author,desc} = req.body
    news.updateOne({_id:id},{$set:{title,type,img,content,author,desc}}).then(data=>{
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

//删除一条新闻
router.post("/del/:id", (req, res, next) => {
    const {id} = req.params;

    news.remove({_id: id}).then(data => {
        if (id) {
            res.json({
                data: "success",
                code: 400,
                msg: "删除成功"
            })
        }
        else {
            res.json({
                data: "不存在的id",
                code: 200,
                msg: "不存在的id"
            })
        }
    }).catch(err => {
        new Error(err);
        next(err)
    })
})
module.exports = router