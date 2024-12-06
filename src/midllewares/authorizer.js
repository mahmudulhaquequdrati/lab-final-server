import jwt from 'jsonwebtoken'
import { UserEntity } from 'src/modules/user/user.entity'

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'

// Middleware function to protect GraphQL requests
export const authorizer = () => async (req, res, next) => {
  try {
    if (req.method === 'GET' && req.originalUrl === '/api/graphql') {
      return next()
    }

    const authHeader = req?.headers?.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' })
    }

    const token = authHeader.split(' ')[1]

    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET)

    // Check if user exists
    const user = await UserEntity.findById(decoded.userId)
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: User does not exist' })
    }

    // Attach the user information to the request object
    req.user = user
    next()
  } catch (err) {
    console.error(err)
    return res.status(401).json({ message: 'Unauthorized: Invalid token' })
  }
}
