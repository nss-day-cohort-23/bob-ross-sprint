"use strict";
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define(
    "User",
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING
    },
    { tableName: "users" }
  );
  User.associate = function(models) {
    User.hasMany(models.Movie, {
      foreignKey: "user_id"
    });
  };
  return User;
};
