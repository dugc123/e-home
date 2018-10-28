const {Router} = require("express")
const router = Router()
const category = require("../database/category.js")

router.post("/add",(req,res,next)=>{
    const {label,value} = req.body
    console.log(label,value)

    category.create({label,value}).then(data=>{
        res.json({
            data:"分类插入成功",
            code:200,
            msg:"success"
        })
    }).catch(err=>{
        const error = new Error(err)
        next(error)
    })
    
})

router.get("/get", (req, res) => {
    let {page = 1,pageSize=10} = req.body
    page=parseInt(page)
    pageSize = parseInt(pageSize)

    category.find().limit(pageSize).skip((page-1)*pageSize).then(data=>{
        res.json({
            data,
            code:200,
            msg:"success"
        })
    })
})

module.exports = router