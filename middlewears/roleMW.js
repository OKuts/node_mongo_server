const jwt = require("jsonwebtoken");
const {secret} = require("../config");

module.exports = (relRoles) => {
  return (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      if (!token) return res.status(403).json({message: 'User is not logged in'});
      const decodedData = jwt.verify(token, secret);
      req.user = decodedData;
      const {roles} = jwt.verify(token, secret);
      let hasRole = false;
      roles.forEach(role => {
        if (relRoles.includes(role)) hasRole = true;
      })
      if (!hasRole) return res.status(403).json({message: 'You do not have access rights'});
      next();
    } catch (e) {
      console.log(e)
      return  res.status(403).json({message: 'User is not logged in'});
    }
  }
}
