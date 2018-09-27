const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  console.log(req.headers);
  if (!token){
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  }
  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }
    req.token = token;
    req.userId = decoded.id;
    next();
  });
}
