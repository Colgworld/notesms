module.exports = (sequelize, DataTypes) => {
  const Notes = sequelize.define('Notes', {
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  // eslint-disable-next-line no-unused-vars
  Notes.associate = (models) => {
    // associations can be defined here
  };

  return Notes;
};
