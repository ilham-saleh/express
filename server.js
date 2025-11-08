import express from "express";
import postsRouter from "./routes/posts.js";
import errorHandle from "./middleware/error.js";
import notFound from "./middleware/notFound.js";
import path from "path";
import { fileURLToPath } from "url";

// get directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set up static folder
app.use(express.static(path.join(__dirname, "public")));

// routes
app.use("/api/posts", postsRouter);

app.get("/current-time", (req, res) => {
  const now = new Date();
  const formatted = now.toLocaleString("en-GB", {
    timeZone: "Europe/London",
    dateStyle: "full",
    timeStyle: "short",
  });
  res.json({ currentTime: formatted });
});

// error handling middleware
app.use(errorHandle);
app.use(notFound);

export default app
