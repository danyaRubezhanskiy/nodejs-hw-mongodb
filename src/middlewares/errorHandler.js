export function errorHandler(err, req, res, next) {
  res.status(err.status).json({
    status: err.status || 500,
    message: 'Something went wrong',
    data: err.message,
  });
}
