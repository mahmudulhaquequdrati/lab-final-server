export const error = (err, req, res, next) => {
  console.log('+++ Checking error from error middleware, error:', err, '+++')

  if (res.headersSent) {
    return next(err)
  }

  return res.status(err?.statusCode || 500).json({ message: err?.message || 'INTERNAL_SERVER_ERROR' })
}
