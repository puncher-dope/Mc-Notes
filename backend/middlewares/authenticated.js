const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.token; 
    if (!token) {
      return res.status(401).send({ error: 'Authentication required' });
    }
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id };
    next();
  } catch (e) {
    res.status(401).send({ error: 'Invalid token' });
  }
};