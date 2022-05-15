const {MongoClient} = require("mongodb")

module.exports = {
    selectedDb : {},
    async connect(){
        try{
            const client = await MongoClient.connect(process.env.MONGO_DB_URL)
            this.selectedDb = client.db('mentor-student')
        }catch(err){
            console.log(err)
        }
    }
}