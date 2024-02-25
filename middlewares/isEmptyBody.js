import HttpError from '../helpers/HttpError.js';

const isEmptyBody = async (req, res, next) => {
  const keys = Object.keys(req.body);
  if (!keys.length) {
    return next(HttpError(400, 'Body must have at least one field'));
  }
  next();
};

export default isEmptyBody;
