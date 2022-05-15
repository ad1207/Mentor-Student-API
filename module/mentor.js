const mongo = require('../shared/connect')

module.exports.getMentor = async (req,res,next) => {
    try{
        var data = await mongo.selectedDb.collection('mentor').find().toArray()
        res.send(data)
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
}

module.exports.createMentor = async (req,res,next) => {
    try{
        var data = await mongo.selectedDb.collection('mentor').insertOne(req.body)
        res.send(data)
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
}

module.exports.assignStudent = async  (req,res,next) => {
    try{
        var arr = req.body.menteeList 
        var arr1=[]
        var stlist = await mongo.selectedDb.collection('student').find().toArray()
        for(var i =0;i<arr.length;i++){
            for(var j=0;j<stlist.length;j++){
                if(stlist[j].id==arr[i]){
                    if(!stlist[j].mentor){
                        var x = await mongo.selectedDb.collection('student').updateOne({id:stlist[j].id},{$set:{mentor:req.params.id}})
                        arr1.push(arr[i].toString())
                    }
                }
            }
        }
        var result = []
        var flag = false;
        var list = await mongo.selectedDb.collection('mentor').find().toArray()
        for(var i=0;i<list.length;i++){
            if(list[i].id==req.params.id){
                flag=true
                if(list[i].menteeList){
                    list[i].menteeList = list[i].menteeList.concat(arr1)
                    result = [...new Set(list[i].menteeList)]
                }
                else{
                    result = arr1
                }
            }
        }
        if(flag==true){
            try{
                var data = await mongo.selectedDb.collection('mentor').updateOne({id:req.params.id},{$set:{menteeList:result}})
            }catch(err){
                console.log(err)
            }
            res.send('Updated')
        }
        else{
            res.send('Mentor not found')
        }
         
    }catch(err){
        console.log(err)
        res.send(err)
    }
}

module.exports.getMenStu = async (req,res,next) => {
    try{
        var data = await mongo.selectedDb.collection('mentor').aggregate(
            [
                {
                    $lookup: {
                           from: 'student',
                           localField: 'menteeList',
                           foreignField: 'id',
                           as: 'Student List'
                         }
                }  
            ]).toArray();
        res.send(data)
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
}