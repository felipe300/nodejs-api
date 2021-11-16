import { BadRequestError, UnauthenticatedError } from '../errors/index.js'
import { StatusCodes } from 'http-status-codes'
import UserSchema from '../models/User.js'

const register = async (req, res) => {
  const user = await UserSchema.create({ ...req.body })
  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}

const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new BadRequestError('Email and password are required!')
  }

  const user = await UserSchema.findOne({ email })
  if (!user) {
    throw new UnauthenticatedError('Invalid credentials')
  }

  const isPasswordValid = await user.comparePassword(password)
  if (!isPasswordValid) {
    throw new UnauthenticatedError('Invalid Password')
  }
  
  const token = user.createJWT()
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
}

export { login, register }
