const db = require("../models");
const Country = db.country;

exports.countries = (req) => {
  return Country.findByPk(req)
    .then(country => {
      if (!country) {
        return "Country Not found.";
      }
      return country.dataValues.name;
    })
    .catch(err => {
      console.log("----------The Error From The Model Is----------", err);
      return { message: err.message };
    });
}