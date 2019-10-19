module.exports = (sequelize, DataTypes) => {
  const Notes = sequelize.define('Notes', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    note_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    note: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categories: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    wasAnalyzed: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    analyzedNote: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  // eslint-disable-next-line no-unused-vars
  Notes.associate = (models) => {
    // associations can be defined here
  };

  return Notes;
};
