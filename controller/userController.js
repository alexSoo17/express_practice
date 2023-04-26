const fs = require("fs");
const allUsers = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/userData.json`)
);
exports.checkId = (req, res, next, val) => {
  console.log(`The id is ${val}`);
  if (req.params.id > allUsers.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid Id",
    });
  }
  next();
};
exports.checkRequest = (req, res, next) => {
  if (!req.body.name || !req.body.age) {
    return res.status(400).json({
      status: "fail",
      message: "Missing name or age",
    });
  }
  next();
};
exports.getAllUsers = (req, res) => {
  res.status(200).json({
    status: "success",
    data: allUsers,
  });
};

exports.getUserById = (req, res) => {
  const id = Number(req.params.id);
  const user = allUsers.find((el) => el.id === id);
  res.status(200).json({
    status: "success",
    data: user,
  });
};

exports.createUser = (req, res) => {
  console.log(req.body);
  const id = allUsers[allUsers.length - 1].id + 1;
  allUsers.push({
    id,
    ...req.body,
  });
  fs.writeFile(
    `${__dirname}/../userData.json`,
    JSON.stringify(allUsers),
    (err) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          status: "fail",
          message: "created error",
        });
      } else {
        return res.status(201).json({
          status: "success",
          message: {
            id,
            ...req.body,
          },
        });
      }
    }
  );
};
