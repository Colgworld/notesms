const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    verificationMethod: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  User.generateHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

  // eslint-disable-next-line func-names
  User.prototype.isValidPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  // eslint-disable-next-line no-unused-vars
  User.associate = (models) => {
    // associations can be defined here
  };

  return User;
};
