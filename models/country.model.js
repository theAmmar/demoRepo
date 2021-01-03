module.exports = (sequelize, Sequelize) => {
  const Country = sequelize.define("countries", {
    code: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoincrement: true,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING
    },
    continent_name: {
      type: Sequelize.STRING
    }
  }, {
    timestamps: false
  });
    return Country;
  }