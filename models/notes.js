module.exports = (sequelize, DataTypes) => {
  const Notes = sequelize.define('Notes', {
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });

  // eslint-disable-next-line no-unused-vars
  Notes.associate = (models) => {
    // associations can be defined here
  };

  return Notes;
};
