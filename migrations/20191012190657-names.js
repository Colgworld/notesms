module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Notes', {
    notes: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: Sequelize.STRING,
      allowNull: false
    },
    category: {
      type: Sequelize.STRING,
      allowNull: false
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false
    },
  }),
  down: queryInterface => queryInterface.dropTable('Notes'),
};
