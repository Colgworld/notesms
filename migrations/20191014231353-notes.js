
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Notes', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    note: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    note_id: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    categories: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    phoneNumber: {
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
  }),
  down: queryInterface => queryInterface.dropTable('Notes'),
};
