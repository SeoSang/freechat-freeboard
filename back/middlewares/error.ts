import { ErrorRequestHandler } from "express"

const ErrorResponse = require("../utils/error")

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let error = { ...err }

  error.message = err.message

  if (err.name === "CastError") {
    const message = `Resource not found`
    error = new ErrorResponse(message, 404)
  }

  if (err.code === 11000) {
    const message = "Duplicate field value entered"
    error = new ErrorResponse(message, 409)
  }

  if (err.name === "ValidationError") {
    const message = "Invalid data inputed"
    error = new ErrorResponse(message, 400)
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  })
}

export default errorHandler
