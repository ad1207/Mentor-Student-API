const express = require("express")
const mongo = require("./shared/connect")
const mentorRouter = require("./routes/mentor")
const studentRouter = require("./routes/student")

const app = express()
app.use(express.json())
mongo.connect()

app.use('/mentor',mentorRouter)
app.use('/student',studentRouter)
app.listen(process.env.PORT || 3000)