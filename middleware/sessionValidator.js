const { Session, User } = require("../models");

const sessionValidator = async (req, res, next) => {
  try {
    const session = await Session.findOne({ where: { token: req.token } });
    if (!session) {
      return res.status(401).json({ error: "User not logged in" });
    }

    const user = await User.findByPk(req.decodedToken.id);
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = sessionValidator;
