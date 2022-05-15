var express = require("express");
var router = express.Router();
const studentModule = require("../module/student")

router.get('/get',studentModule.getStudent)
router.post('/create',studentModule.createStudent)
router.post('/assign/:id',studentModule.assignMentor)

module.exports = router