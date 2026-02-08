import jwt, { Secret, SignOptions } from 'jsonwebtoken'

export const createToken = (
  jwtPayload: { userId: string; role: string },
  secret: Secret,
  expiresIn: SignOptions['expiresIn']
): string => {
  return jwt.sign(jwtPayload, secret, { expiresIn })
}
