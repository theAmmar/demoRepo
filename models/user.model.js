module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoincrement: true,
        allowNull: false
      },
      full_name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      country_code: {
        type: Sequelize.INTEGER
      },
      created_at: {
        type: Sequelize.DATE
      }
    },{
      timestamps: false
    });
  
    return User;
  };