const express = require('express')
const app = express()
require('dotenv').config();
const dbconnect = require('./api/v1/db/db')
app.use(express.json());
const axios = require('axios')
const cors = require('cors')


//cors allow for all
app.use(cors());

//DB connection
dbconnect()

//ejs configuration
app.set('view engine', 'ejs');
app.set('views', './views');



const PORT = 3000 | process.env.PORT

//Router Navigation
app.use("/api/v1", require('./api/v1/routes/routes'));
app.use("/code", require('./api/v1/routes/codeRoute'));
app.use("/",require('./api/v1/routes/routes'))




// views rendering
// app.get('/link', (req, res) => {
    
    
//     res.render('index');

// })




app.listen(PORT, () => {
    console.log(`server listening on PORT ${PORT}`)
})