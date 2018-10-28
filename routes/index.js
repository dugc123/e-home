var express = require('express');
var router = express.Router();


router.use("/user",require('../controller/user'))
router.use("/category",require("../controller/category"))
router.use("/news",require('../controller/news'))
router.use("/slider",require('../controller/slider'))
router.use("/discuss", require('../controller/discuss'))
router.use("/personalSummary", require('../controller/personalSummary'))
router.use("/invitation", require('../controller/invitation'))
router.use("/topic", require('../controller/topic'))
router.use("/common", require('../controller/common'))

module.exports = router;
