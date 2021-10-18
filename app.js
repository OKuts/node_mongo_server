const express = require('express');
const mongoose = require('mongoose');
// const path = require('path');
const router = require('./routes/router')

const PORT = process.env.PORT || 3000;
const DB_URL = 'mongodb+srv://<username>:<password>@cluster0.ufrci.mongodb.net/<dbName>?retryWrites=true&w=majority';

const app = express();
app.use(express.json());
app.use('/auth', router);

// const createPath = page => path.resolve(__dirname, 'pages', `${page}.html`);

const start = async () => {
  try {
    await mongoose.connect(DB_URL);
    app.listen(PORT, () => {
      console.log('listening port ' + PORT);
    })
  } catch (e) {
    console.log(e)
  }
}

start();

// app.use(express.static('pages/styles'));
//
// app.get('/', ((req,res) => {
//   res.sendFile(createPath('hello'));
// }))
//
// app.get('/contacts', ((req,res) => {
//   res.sendFile(createPath('contacts'));
// }))
//
// app.use(((req,res) => {
//   res
//     .status(404)
//     .sendFile(createPath('error'));
// }))
