//用户鉴权  controller中的user用户登录中保存
module.exports = function (req,res,next) {
    if (req.session && req.session.user) { //用户登陆后把信息存到session中
        next()
    }else{
        res.json({
            code:401,
            msg:"用户登录状态过期"
        })
    }
}
