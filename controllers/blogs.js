const router = require("express").Router();
const { Op } = require("sequelize");

const { Blog, User } = require("../models");
const blogFinder = require("../middleware/blogFinder");

const tokenExtractor = require("../middleware/tokenExtractor");

router.get("/", async (req, res, next) => {
  const where = {};

  if (req.query.search) {
    where[Op.or] = [
      {
        title: {
          [Op.substring]: req.query.search,
        },
      },
      {
        author: {
          [Op.substring]: req.query.search,
        },
      },
    ];
  }

  try {
    const blogs = await Blog.findAll({
      attributes: { exclude: ["userId"] },
      include: {
        model: User,
        attributes: ["name"],
      },
      where,
      order: [["likes", "DESC"]],
    });
    res.json(blogs);
  } catch (error) {
    next(error);
  }
});

router.post("/", tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);
    const blog = await Blog.create({
      ...req.body,
      userId: user.id,
      date: new Date(),
    });
    res.json(blog);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", blogFinder, tokenExtractor, async (req, res, next) => {
  try {
    if (req.blog) {
      const user = await User.findByPk(req.decodedToken.id);
      if (req.blog.userId === user.id) {
        await req.blog.destroy();
        res.status(204).end();
      } else {
        res.status(401).json({ error: "Not authorized to delete blog post" });
      }
    } else {
      res.status(404).json({ error: "Blog not found" });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", blogFinder, async (req, res, next) => {
  try {
    if (req.blog) {
      req.blog.likes = req.body.likes;
      await req.blog.save();
    } else {
      res.status(404).json({ error: "Blog not found" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
