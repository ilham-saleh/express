let posts = [
  { id: 1, title: "First Post", content: "This is the first post." },
  { id: 2, title: "Second Post", content: "This is the second post." },
  { id: 3, title: "Third Post", content: "This is the third post." },
];

// @desc    get posts
// @route   GET /api/posts
export const getPosts = (req, res, next) => {
  const limit = parseInt(req.query.limit);

  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(posts.slice(0, limit));
  }
  res.status(200).json(posts);
};

// @desc    get post
// @route   GET /api/posts/:id
export const getPost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((p) => p.id === id);

  if (!post) {
    const error = new Error(`Post with the id of ${id} was not found.`);
    error.status = 404;
    return next(error);
  }

  res.status(200).json(post);
};

// @desc    create post
// @route   POST /api/posts
export const createPost = (req, res, next) => {
  const { title } = req.body;

  if (!title) {
    const error = new Error("Title and content are required.");
    error.status = 400;
    return next(error);
  }

  const newPost = {
    id: posts.length + 1,
    title,
  };
  posts.push(newPost);
  res.status(201).json(newPost);
};

// @desc    update post
// @route   PUT /api/posts/:id
export const updatePost = (req, res, next) => {
  const { id } = req.params;

  const post = posts.find((post) => post.id === parseInt(id));

  if (!post) {
    const error = new Error(`Post with the id of ${id} was not found.`);
    error.status = 404;
    return next(error);
  }

  // update post details
  post.title = req.body.title;
  post.content = req.body.content;

  res.status(200).json(post);
};

// @desc    delete post
// @route   DELETE /api/posts/:id
export const deletePost = (req, res, next) => {
  const { id } = req.params;
  const post = posts.findIndex((post) => post.id === parseInt(id));

  if (!post) {
    const error = new Error(`Post with the id of ${id} was not found.`);
    error.status = 404;
    return next(error);
  }

  posts = posts.filter((post) => post.id !== parseInt(id));
  res
    .status(200)
    .json({ message: `Post with the id of ${id} has been deleted.` });
};
