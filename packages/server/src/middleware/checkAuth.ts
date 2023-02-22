import { NextFunction, Request, Response } from 'express'
import { YANDEX_API_URL } from '../constants/main'

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.headers.cookie) {
    const isAuthUser = await fetch(`${YANDEX_API_URL}/auth/user`, {
      headers: {
        Cookie: req.headers.cookie,
      },
    })

    if (isAuthUser.ok) {
      return next()
    }
  }

  return res.status(401).json({ message: 'not authorized' })
}
