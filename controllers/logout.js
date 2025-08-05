const router = require("express").Router();

const { Session } = require("../models");

const tokenExtractor = require("../middleware/tokenExtractor");

router.delete("/", tokenExtractor, async (req, res, next) => {
    console.log(req.token)
  await Session.destroy({ where: { token: req.token } });

  res.status(200).send("User logged out");
});

module.exports = router;
