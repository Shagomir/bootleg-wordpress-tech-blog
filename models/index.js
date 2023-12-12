const User = require("./User");
const Comment = require("./Comment");
const Post = require("./Post");

// TODO: USER has many POST

User.hasMany(Post, {
  foreignKey: "author_id",
});

Post.belongsTo(User,{
  foreignKey: "author_id",
});

// // TODO: USER has many COMMENT

User.hasMany(Comment, {
  foreignKey: "commentor_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(User,{
  foreignKey: "commentor_id",
});

// // TODO: POST has many COMMENT

Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

// // TODO: COMMENT has one POST
Comment.belongsTo(Post, {
  foreignKey: "post_id",
});

module.exports = { User, Comment, Post };
