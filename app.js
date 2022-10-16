const express = require("express");
const cors = require("cors");
// const db = require("./config/database");

const adminRoute = require("./routes/admin.route");
const userRoute = require("./routes/person.route");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/admin", adminRoute);
app.use("/user", userRoute);

app.get("/", (req, res) => {
  res.json("App is working");
});

app.listen(4500, () => {
  console.log("run");
});
