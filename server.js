// const Moralis = require("moralis/node");
const DATABASE_NAME = "forkdashboard";
// const CONNECTION_URL = "mongodb://localhost:27017/"+DATABASE_NAME;
const CONNECTION_URL = "mongodb+srv://leo12345:leo12345@cluster0.qu4ls.mongodb.net/forkdashboard";
const cloudinary = require('cloudinary');
require('dotenv').config()
// leo12345

const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/common-evm-utils");
const MORALIS_API_KEY = "arif";
const address = "pGeTOqYbzZ4xBv8wrojo1PxmVvS2OFxWecwE3wTF0RiNm3EeAsweeqbd4QgkrGhw";


const mongoose = require('mongoose');
const mongoDB = process.env.MONGODB_URI || CONNECTION_URL;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const express = require("express");
const fileUpload = require('express-fileupload');
const cors = require("cors");
var bodyParser = require('body-parser');
const fs = require("fs");
var router = require('./routes/api/router');
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
app.use('/',  router)
GLOBAL_API_KEY_INDEX = 0;
app.listen(PORT, () => {
  console.log(`Server running at (http://localhost:${PORT})`);
});