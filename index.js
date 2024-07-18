const express = require("express");
const app = express();
require("dotenv").config(); // Load environment variables
const cors = require("cors");



// Allow only the Vercel frontend origin
// const allowedOrigins = ["https://bitter-eight.vercel.app"];

app.use(express.json());
app.use(cors({
  origin: ["https://bitter-eight.vercel.app"], //allow request only from these site
  methods: ["GET","POST","PUT","DELETE"],
  credentials: true, //for getting cookies and other headers from backend
  samesite : "none",
  secure: true,
}))

const db = require("./models");

// Routers
const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);
const commentsRouter = require("./routes/Comments");
app.use("/comments", commentsRouter);
const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);
const likesRouter = require("./routes/Likes");
app.use("/likes", likesRouter); 

// Simple route to check server status
app.get("/status", (req, res) => {
  res.send("Server is running!");
});

// Synchronize database
db.sequelize.sync()
.then(() => {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error("Unable to connect to the database:", err);
});
