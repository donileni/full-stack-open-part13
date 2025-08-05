const router = require("express").Router();

const { ReadingList } = require("../models");

router.post("/", async (req, res, next) => {
  try {
    const readingList = await ReadingList.create(req.body);
    res.json(readingList);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const readingList = await ReadingList.findByPk(req.params.id);
    if (readingList) {
      readingList.read = req.body.read;
      await readingList.save();
    } else {
      res.status(404).json({ error: "Reading list not found" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
