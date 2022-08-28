

const express = require ('express')
const consign = require('consign')
const db = require('./config/db')
const mongoose = require('mongoose')
const cors = require('cors')
//require('./config/firebase')
require('./config/mongodb')



const app = express()
app.use(cors()) 
app.db = db
app.dbcrm = mongoose



consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api/models')
    .then('./api/usuarios.js')
    .then('./api/validator.js')
    .then('./api')
    .then('./schedules')
    .then('./config/routes.js')
    .into(app)


app.listen(3003, ()=>{
    console.log('Backend executando: Porta 3003...')
})