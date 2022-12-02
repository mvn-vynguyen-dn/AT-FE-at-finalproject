const mongoose = require("mongoose");
const app = require("./src/lib/Express");

require("dotenv").config();
mongoose.Promise = global.Promise;

mongoose
  .connect(process.env.DB_HOST + process.env.DB_NAME)
  .then(() => {
    console.log("Sucsess connected database");
  })
  .catch((err) => {
    console.log(err);
    console.log("Could not connect to the database.ow...");
    process.exit();
  });

if (!module.parent) {
  app.listen(3000, onStarted);
  app.on("error", onError);
  app.on("listening", onListening);
}

function onStarted() {
  console.info(`Server started on port 3000`);
}

function onError(e) {
  console.error(`ERROR: ${e}`);
}

function onListening() {
  console.info(`Server is listening on port`);
}
