module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Organizers', [
        {
            name: 'Organizer1',
            password: 'password1',
            permissions: JSON.stringify(['module1', 'module2'])
        },
        {
            name: 'Organizer2',
            password: 'password2',
            permissions: JSON.stringify(['module1'])
        }
    ]),
    down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Organizers', null, {})
};
