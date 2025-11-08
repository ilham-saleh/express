const notFound = (req, res, next) => {
  const error = new Error(
    `The requested resource ${req.originalUrl} was not found.`
  );
  error.status = 404;
  next(error);
};

export default notFound;
