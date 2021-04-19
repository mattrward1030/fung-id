const seedUsers = require('./userData');
const seedPosts = require('./postData');
const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    await seedUsers();
    await seedPosts();
    process.exit(0);
};

seedAll();
