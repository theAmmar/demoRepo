const db = require("../models");
const User = db.user;

exports.users = (req) => {
  return User.findByPk(req)
    .then(user => {
      if (!user) {
        return "User Not found.";
      }
      return user.dataValues;
    })
    .catch(err => {
      console.log('----------The Error From The Model Is----------')
      return { message: err.message };
    });
}