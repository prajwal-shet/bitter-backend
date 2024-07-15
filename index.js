const express = require("express");
const app = express();
require("dotenv").config(); // Load environment variables
const cors = require("cors");

// Allow only the Vercel frontend origin
const allowedOrigins = ["https://bitter-eight.vercel.app"];

app.use(express.json());
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin like mobile apps, curl requests
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // if you want to allow cookies to be sent with requests
}));

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
