const router = require("express").Router();

const { User, Blog } = require("../models");

router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: [
      {
        model: Blog,
        attributes: { exclude: ["userId"] },
      },
      {
        model: Blog,
        as: "blogs_to_read",
        attributes: ["title"],
        through: {
          attributes: ["read"]
        }
      }
    ],
  });
  res.json(users);
});

router.post("/", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.put("/:username", async (req, res) => {
  const user = await User.findOne({ where: { username: req.params.username } });
  if (user) {
    user.username = req.body.newUsername;
    await user.save();
    res.json(user);
  } else {
    return res.status(404).json({ error: "user not found" });
  }
});

module.exports = router;
