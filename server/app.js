const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const userRoute = require('./routes/userRoutes')
const transRoutes = require('./routes/transRoutes')
const codeRoutes = require('./routes/redeemRoutes')
const marketRoutes = require('./routes/marketRoutes')

dotenv.config({path: './config.env'})


const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)

app.listen(5000, () => {
 console.log(`Connected to port 5000`)
})

app.use(express.urlencoded({ extended: true }))

app.use(cors());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(express.json())
app.use('/user', userRoute)
app.use('/doc', transRoutes)
app.use('/code', codeRoutes)
app.use('/market', marketRoutes)
const mongoConnect = mongoose.connect(DB).then(() => {
 console.log('connected')
})

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

module.exports = app