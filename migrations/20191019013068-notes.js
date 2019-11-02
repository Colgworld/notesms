
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Notes', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    user_id: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    note_id: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    text: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }, {
    timeStamps: true
  }),
  down: queryInterface => queryInterface.dropTable('Notes'),
};
