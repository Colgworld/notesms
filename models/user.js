const { hash, compare } = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING
    },
    verificationMethod: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  User.generateHash = async password => {
    const hashedPwd = await hash(password, 12);
    return hashedPwd;
  };

  // eslint-disable-next-line func-names
  User.prototype.isValidPassword = function(password) {
    return compare(password, this.password);
  };

  // eslint-disable-next-line no-unused-vars
  User.associate = models => {
    // associations can be defined here
  };

  return User;
};
