export class HttpError extends Error {
  constructor(status, code, message, details) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export function notFound(req, res) {
  res
    .status(404)
    .json({
      error: {
        code: "NOT_FOUND",
        message: `No route for ${req.method} ${req.path}`,
      },
    });
}

export function errorHandler(error, req, res, next) {
  if (res.headersSent) return next(error);
  const status = error.status || 500;
  if (status >= 500) console.error(error);
  res.status(status).json({
    error: {
      code: error.code || "INTERNAL_ERROR",
      message:
        status >= 500 && process.env.NODE_ENV === "production"
          ? "An unexpected server error occurred."
          : error.message,
      ...(error.details ? { details: error.details } : {}),
    },
  });
}
