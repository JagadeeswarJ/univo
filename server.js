const express = require("express");
const cors = require("cors");

const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Basic test route
app.get("/", (req, res) => {
  res.send("Hello, deployment test!");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
