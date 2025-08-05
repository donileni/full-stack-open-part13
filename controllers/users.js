const router = require("express").Router();

const { User, Blog } = require("../models");

router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ["userId"] },
    },
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

router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ["name", "username"],
      include: {
        model: Blog,
        as: "readings",
        attributes: { exclude: ["createdAt", "updatedAt", "userId"] },
        through: {
          attributes: ["read", "id"],
        },
      },
    });

    if (user) {
      res.json(user);
    } else {
      return res.status(404).json({ error: "user not found" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
