import express from "express";
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postController.js";
const router = express.Router();

// get all posts or limit the number of posts returned
router.get("/", getPosts);

// get a specific post by id
router.get("/:id", getPost);

// create a new post
router.post("/", createPost);

// update an existing post by id
router.put("/:id", updatePost);

// delete a post by id
router.delete("/:id", deletePost);

export default router;
