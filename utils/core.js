const jwt = require("jsonwebtoken");

/**
 * @see https://stackoverflow.com/questions/27117337/exclude-route-from-express-middleware
 * @param {String} path 
 * @param {String} middleware 
 */
const unless = (path, middleware) => (req, res, next) =>
  path === req.path ? next() : middleware(req, res, next);

const generateToken = async data => {
  const expiresIn = parseInt(process.env.TOKEN_EXPIRES_IN);
  const token = await jwt.sign({ data }, process.env.JWT_SECRET_KEY, {
    expiresIn
  });
  return token;
};

const getVerifiedTokenData = async token => {
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    return { error: false, payload: decoded };
  } catch (error) {
    return { error: true, payload: null };
  }
};

module.exports = {
  unless,
  generateToken,
  getVerifiedTokenData
};
