const User = require('./User');
const Post = require('./Post');
const Upload = require('./Upload');



User.hasMany(Post, {
    foreignKey: 'user_id',
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: "CASCADE"
});

User.hasMany(Upload, {
    foreignKey: 'user_id',
});

Upload.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: "CASCADE"
});




module.exports = { User, Post, Upload };

