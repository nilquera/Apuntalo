const jwt = require('jsonwebtoken')

// ========================
//  Token Verification
// ========================
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

    req.usuario = decoded.usuario

    next()
  })
}

// ========================
//  Admin Role Verification
// ========================
let verifyAdmin = (req, res, next) => {
  let user = req.usuario
  if (user.role === 'ADMIN_ROLE'){
    next()
  } else {
    return res.status(401).json({
      ok: false,
      err: {
        message: 'Necesitas privilegios de administrador'
      }
    })
  }


}

module.exports = {
  verifyToken,
  verifyAdmin
}
