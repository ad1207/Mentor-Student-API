const mongo = require('../shared/connect')

module.exports.getStudent = async (req,res,next) => {
    try{
        var data = await mongo.selectedDb.collection('student').find().toArray()
        res.send(data)
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
}

module.exports.createStudent = async (req,res,next) => {
    try{
        var data = await mongo.selectedDb.collection('student').insertOne(req.body)
        res.send(data)
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
}

module.exports.assignMentor = async (req,res,next) => {
    try{
        var list = await mongo.selectedDb.collection('student').find().toArray()
        for(var i=0;i<list.length;i++){
            if(list[i].id==req.params.id){
                var mentor = list[i].mentor
            }
        }
        var mmlist = []
        var mllist = []
        if(mentor){
            var mentorList = await mongo.selectedDb.collection('mentor').find().toArray()
            for(var i=0;i<mentorList.length;i++){
                if(mentorList[i].id==mentor){
                    mmlist = mentorList[i].menteeList;
                }
                else if(mentorList[i].id==req.body.mentor){
                    mllist = mentorList[i].menteeList;
                }
            }
            mmlist = mmlist.filter(item => item !== req.params.id)
            mllist.push(req.params.id)
            var x = await mongo.selectedDb.collection('mentor').updateOne({id:mentor},{$set:{menteeList:mmlist}})
            var y = await mongo.selectedDb.collection('mentor').updateOne({id:req.body.mentor},{$set:{menteeList:mllist}})
            var data = await mongo.selectedDb.collection('student').updateOne({id:req.params.id},{$set:{mentor:req.body.mentor}}) 
            res.send(data)
        }else{
            res.send("Student not found")
        }
    }catch(err){
        console.log(err)
        res.send(err)
    }
}