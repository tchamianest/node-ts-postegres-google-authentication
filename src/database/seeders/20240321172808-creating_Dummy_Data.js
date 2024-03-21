'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        firstname: 'ISHIMWE',
        lastname: 'Ami Paradis',
        email: 'lee@example.com',
        imageUrl: 'image_url_here',
        googleId: 'google_id_here',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstname: 'ISHIMWE',
        lastname: 'Ami Paradis',
        email: 'lee@example.com',
        imageUrl: 'image_url_here',
        googleId: 'google_id_here',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstname: 'Jane',
        lastname: 'Doe',
        email: 'jane@example.com',
        imageUrl: 'kagaba.jpg',
        googleId: 'google_id_here',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
