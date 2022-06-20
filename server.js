// const Moralis = require("moralis/node");
const DATABASE_NAME = "forkdashboard";
// const CONNECTION_URL = "mongodb://localhost:27017/"+DATABASE_NAME;
const CONNECTION_URL = "mongodb+srv://forkauth:VqhPVVQ43qXAd0zq@fork.feop0.mongodb.net/forkdashboard";
const cloudinary = require('cloudinary');
require('dotenv').config()

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://forkauth:<password>@fork.feop0.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });



const mongoose = require('mongoose');
const mongoDB = process.env.MONGODB_URI || CONNECTION_URL;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const axios = require("axios");
const { exit } = require("process");
const express = require("express");
const fileUpload = require('express-fileupload');
const cors = require("cors");
var bodyParser = require('body-parser');
const fs = require("fs");
//test url::::: http://localhost:2083/wallet/0x704111eDBee29D79a92c4F21e70A5396AEDCc44a

var router = require('./routes/api/router');

// const serverUrl = "https://8dyuriovbupo.usemoralis.com:2053/server";
// const appId = "rLSZFQmw1hUwtAjRnjZnce5cxu1qcPJzy01TuyU1";

let history = null;
let serverState = false;
let moralisStarted = false;
let state_cnt = 0

let testData = {
  //wallet: "0x704111eDBee29D79a92c4F21e70A5396AEDCc44a", //biggest wallet
  //wallet: "0xa4c8d9e4ec5f2831701a81389465498b83f9457d", //KLIMA, rebasing (complex)
  wallet: "0xf8aae8d5dd1d7697a4ec6f561737e68a2ab8539e", //QuickSwap, simple LP
  //token: '0x510d776fea6469531f8be69e669e553c0de69621',
  //blockheight: 20138207,
  chain: "polygon",
};

const DELAY = 1000;
const TRANSACTION_MAX = 2000; // max length of fetched transaction to avoid error of rate exceed

const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})

app.use(cors());
app.use(bodyParser.json({
  parameterLimit: 100000,
  limit: '50mb'
}))
app.use(fileUpload());
const PORT = process.env?.PORT || 2083;


// Moralis.start({ serverUrl, appId })
//   .then(() => {
//     console.log("moralis successfully started");
//     serverState = true;
//     moralisStarted = true;

//   })
//   .catch((e) => {
//     console.log("moralis start error", e);
//     // history = 'moralis start error';
//     history = {
//       message: "moralis start error",
//       error: e,
//     };
//     serverState = false;
//     // exit(1);
//   });
app.use('/', router)
// app.get('/state', async (req, res) => {
//   console.log('state')
//   res.send({progress:state_cnt})
//   // if(moralisStarted)getWalletCostHistory(data=> res.send({portfolioData:data}),{wallet:req.params.id,chain: req.params.chainName})
// });

// app.get('/wallet/:id/:chainName', async (req, res) => {
//   console.log(req.params.chainName)
//   if(req.params.chainName=='polygon')state_cnt=0
//   if(moralisStarted)getWalletCostHistory(data=> res.send(data),{wallet:req.params.id,chain: req.params.chainName})
// });

GLOBAL_API_KEY_INDEX = 0;
app.listen(PORT, () => {
  console.log(`Server running at (http://localhost:${PORT})`);
});
function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}