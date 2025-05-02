'use strict'

function errorHandler(err, req, res, next) {
  console.error('Error Middleware:', err)

  const statusCode = err.statusCode || 500

  res.status(statusCode).json({
    message: err.message || 'Internal Server Error',
    details: err.details || null,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  })
}

module.exports = errorHandler
