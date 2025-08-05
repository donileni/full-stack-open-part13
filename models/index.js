const Blog = require("./blog");
const User = require("./user");
const ReadingList = require("./readingList")

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingList, as: "blogs_to_read" });
Blog.belongsToMany(User, { through: ReadingList });

module.exports = {
  Blog,
  User,
  ReadingList,
};
