const { User } = require('../models');

const userData = [
    {
        username: "test1",
        email: "test1@test.com",
        password: "test123456",
    },

];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;