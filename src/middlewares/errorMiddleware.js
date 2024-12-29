const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err?.message || "Something went wrong";

  console.error("[errorHandler middleware]:", err); // Log the error

  res.status(statusCode).json({
    success: false,
    error: err.error || "internal_server_error",
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }), // Show stack trace in development
  });
};

module.exports = errorHandler;
