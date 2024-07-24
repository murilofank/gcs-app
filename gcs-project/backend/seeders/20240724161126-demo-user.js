'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        name: 'Murilo',
        email: 'murilo@example.com',
        birthDate: '01/11/1993',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'John',
        email: 'john@example.com',
        birthDate: '05/05/2000',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
