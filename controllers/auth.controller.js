const db = require("../models");
const User = db.user;

exports.signin = (req) => {
    return User.findOne({
      where: {
        email: req.email
      }
    })
      .then(user => {
        if (!user) {
          return "User Not found.";
        }
        return user;
      })  
      .catch(err => {
        console.log('----------The Error From The Model Is----------')
        return { message: err.message };
      });
    }