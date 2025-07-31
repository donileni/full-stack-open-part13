const router = require("express").Router();

const { Blog } = require("../models");
const blogFinder = require("../middleware/blogFinder")

router.get("/", async (req, res, next) => {
  try {
    const blogs = await Blog.findAll();
    res.json(blogs);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const blog = await Blog.create(req.body);
    res.json(blog);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", blogFinder, async (req, res, next) => {
  try {
    if (req.blog) {
      await req.blog.destroy();
      res.status(204).end();
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
