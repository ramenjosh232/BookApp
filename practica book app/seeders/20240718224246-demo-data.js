'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', [
      { name: 'Science Fiction', description: 'Books about futuristic concepts', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Fantasy', description: 'Books about magical worlds', createdAt: new Date(), updatedAt: new Date() }
    ], {});

    await queryInterface.bulkInsert('Authors', [
      { name: 'Isaac Asimov', email: 'asimov@example.com', createdAt: new Date(), updatedAt: new Date() },
      { name: 'J.K. Rowling', email: 'rowling@example.com', createdAt: new Date(), updatedAt: new Date() }
    ], {});

    await queryInterface.bulkInsert('Publishers', [
      { name: 'Penguin Books', phone: '123-456-7890', country: 'USA', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Bloomsbury', phone: '987-654-3210', country: 'UK', createdAt: new Date(), updatedAt: new Date() }
    ], {});

    await queryInterface.bulkInsert('Books', [
      { title: 'Foundation', year: 1951, cover: 'foundation.jpg', categoryId: 1, authorId: 1, publisherId: 1, createdAt: new Date(), updatedAt: new Date() },
      { title: 'Harry Potter and the Philosopher\'s Stone', year: 1997, cover: 'hp1.jpg', categoryId: 2, authorId: 2, publisherId: 2, createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Books', null, {});
    await queryInterface.bulkDelete('Publishers', null, {});
    await queryInterface.bulkDelete('Authors', null, {});
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
