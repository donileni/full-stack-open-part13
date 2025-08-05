const router = require("express").Router();

const { ReadingList } = require("../models");

router.post("/", async (req, res, next) => {
  try {
    const readingList = await ReadingList.create(req.body);
    res.json(readingList);
  } catch (error) {
    next(error)
  }
});

module.exports = router