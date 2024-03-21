'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    /// Add seed commands here.
     
   
     await queryInterface.bulkInsert('Users', [

      {
        displayName: 'Gakwege Simon',
        email:'mugema@gmail.com',
        photoURL:"test.png",
        googleId:'124535535535',
        
        },

        {
          displayName: 'Gakwege Mukobanya',
          email:'leeman@gmail.com',
          photoURL:"test.png",
          googleId:'12443535535',
         
          },
      ], {});
  
  },

  async down (queryInterface, Sequelize) {
   
     await queryInterface.bulkDelete('Users', null, {});
     
  }
};