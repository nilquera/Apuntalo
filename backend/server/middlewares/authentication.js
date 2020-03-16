const jwt = require('jsonwebtoken')

// Token Verification
let verifyToken = (req, res, next) => {
  let token = req.get('Authorization')

  jwt.verify(token, process.env.SEED, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        err: {
          message: 'Token no válido'
        }
      })
    }

    req.user = decoded.user

    next()
  })
}

// Admin Role Verification
let verifyAdmin = (req, res, next) => {
  let user = req.user
  if (user.role === 'ADMIN_ROLE'){
    next()
  } else {
    return res.status(401).json({
      ok: false,
      err: {
        message: 'You need admin privileges'
      }
    })
  }


}

module.exports = {
  verifyToken,
  verifyAdmin
}
