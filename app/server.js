const express = require('express')
const app = express()
require('dotenv').config();
const dbconnect = require('./api/v1/db/db')
app.use(express.json());

//DB connection
dbconnect()


const PORT = 3000 | process.env.PORT

//Router Navigation
app.use("/api/v1", require('./api/v1/routes/routes'));



app.listen(PORT, () => {
    console.log(`server listening on PORT ${PORT}`)
})