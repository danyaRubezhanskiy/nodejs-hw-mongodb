import createHttpError from 'http-errors';

export function validateBody(schema) {
  return (req, res, next) => {
    const result = schema.validate(req.body);

    if (typeof result.error != 'undefined') {
      return next(createHttpError(400, 'request body is not valid'));
    }
    next();
  };
}
