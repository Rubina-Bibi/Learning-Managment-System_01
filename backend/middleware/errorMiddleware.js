const notFound = (req, res) => {
  res.status(404).json({ message: 'Route not found' });
};

const errorHandler = (err, req, res, next) => {
  const error = err.message || err;
  res.status(err.statusCode || 500).json({
    message: error.message || 'Server Error'
  });
};

export { notFound, errorHandler };