const express = require("express");
const userRoute = require("./routes/user.route");
const actRoute = require("./routes/act.route");
const complaintRoute = require("./routes/complaint.route");
const hrdRoute = require("./routes/hrd.routes");
const cors = require('cors')

const app = express();
app.use(express.json());

app.use(cors({
  origin: "*"
}))

app.set("view-engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.use("/auth", userRoute);
app.use("/act", actRoute);
app.use("/complaint", complaintRoute);
app.use("/hrd", hrdRoute);

app.get("/", (req, res) => {
  res.send('App is working')
});

app.listen(3001,()=> {
  console.log("Server running at 3001");
});
