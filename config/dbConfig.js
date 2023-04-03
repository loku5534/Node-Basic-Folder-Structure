const mongoose = require("mongoose");

const dbURI = process.env.MONGO_DB;

mongoose
  .connect(dbURI)
  .then((result) => console.log(`DB Connected Successfully. ${result}`))
  .catch((error) => console.log(`Error: ${error}`));
