const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config({
  path: `${__dirname}/config.env`,
});

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("connected db successfully");
  });

const app = require("./app");
app.listen(process.env.PORT, () => {
  console.log(`App is running on port ${process.env.PORT}`);
});
