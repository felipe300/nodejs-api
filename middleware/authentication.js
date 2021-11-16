import { UnauthenticatedError } from '../errors/index.js'
// import UserSchema from '../models/user.js'
import jwt from 'jsonwebtoken'

const authentication = async (req, res, next) => {
  // check header or url parameters or post parameters for token
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('Authentication invalid')
  }

  const token = authHeader.split(' ')[1]

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    // attach user to job routes
    req.user = { userId: payload.userId, name: payload.name }
    next()
  } catch (err) {
    throw new UnauthenticatedError(`Authentication invalid ${err}`)
  }
}

export default authentication
