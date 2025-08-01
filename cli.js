require("dotenv").config();
const { Sequelize, QueryTypes } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL);

const main = async () => {
  const blogs = await sequelize.query("SELECT * FROM blogs", {
    type: QueryTypes.SELECT,
  });
  blogs.map((blog) => {
    console.log(`${blog.author}: '${blog.title}', ${blog.likes}, likes`);
  });
  sequelize.close();
};

main();
