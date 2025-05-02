const jwt = require('jsonwebtoken')

module.exports.checkAuth = (expectedIssuer) => {
    return (req, res, next) => {
      const token = req.cookies.token
  
      if (!token) return res.status(401).json({message: 'Unauthorized'})
  
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
  
        if (!decoded) return res.status(401).json({message: 'Unauthorized'})
        if (!decoded.iss || decoded.iss !== expectedIssuer) return res.status(401).json({message: 'Unauthorized'})
  
        req.user = decoded
        next()
      } catch (error) {
        console.error('JWT error', error)
        return res.status(401).json({message: 'Unauthorized'})
      } 
    }
}
  