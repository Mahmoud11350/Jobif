const notFound = (req, res) =>
  res.status(404).json({
    data: {
      message: "not found route",
    },
  });

export default notFound;
