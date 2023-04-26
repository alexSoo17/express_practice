const mongoose = require("mongoose");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config({
  path: `${__dirname}/../config.env`,
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

const tours = fs.readFileSync(`${__dirname}/tour-simple.json`);
const Tour = require("../models/tourModel");
const { argv } = require("process");
const importData = async () => {
  try {
    await Tour.create(JSON.parse(tours));
    console.log("data has been imported");
  } catch (e) {
    console.log(e);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log("data has been deleted");
  } catch (e) {
    console.log(e);
  }
  process.exit();
};

// argv 代表正在运行的进程信息 是一个数组 第一个是node 第二个执行的文件 第三个代表--command
if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
