//create blog, delete blog, edit blog

exports.blogs = (req, res) => {
  res.status(201).json({ message: "here are all the blogs" });
};
