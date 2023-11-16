const express = require("express");
const userRoute = require("./routes/userRoute");
const blogRoute = require("./routes/blogRoute");
const dotenv = require("dotenv");
const app = express();

app.use(express.json());

dotenv.config({ path: "./.env" });

require("./server");

app.use("/api/user", userRoute);

app.use("/api/blog", blogRoute);

app.listen(8000, () => {
  console.log("listening on port 8000");
});
