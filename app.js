const express = require('express')
const app = express()
const router = require('./routes/index');
const hostname ='127.0.0.1'

app.use(express.json());

app.use('/api', router);

const port = process.env.PORT || 3000

app.listen(port, hostname , () =>{
  console.log(`Serveur demarree : http://${hostname}:${port}`);
} )
