var express = require("express");
var router = express.Router();
const mentorModule = require("../module/mentor")

router.get('/get',mentorModule.getMentor)
router.post('/create',mentorModule.createMentor)
router.post('/assign/:id',mentorModule.assignStudent)
router.get('/menteelist',mentorModule.getMenStu)

module.exports = router