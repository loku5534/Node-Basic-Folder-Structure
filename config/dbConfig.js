require('dotenv').config();
const mongoose = require("mongoose");

const MongoDB_Url = process.env.MongoDB;

mongoose.connect(MongoDB_Url).then(() => console.log("DB Connected Successfully."))
  .catch((error) => console.log(`Error: ${error}`));
