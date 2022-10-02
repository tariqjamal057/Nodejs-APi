const express = require("express");
// const userRoute = require("./routes/user.route");
// const actRoute = require("./routes/act.route");
// const complaintRoute = require("./routes/complaint.route");
// const hrdRoute = require("./routes/hrd.routes");
const cors = require('cors')
const db = require("./config/database");
const jwt = require("jsonwebtoken");
const token = require("./middleware/token.middleware");

const app = express();
app.use(express.json());

app.use(cors({
  origin: "*"
}))

// app.set("view-engine", "ejs");
// app.use(express.urlencoded({ extended: false }));

// app.use("/auth", userRoute);
// app.use("/act", actRoute);
// app.use("/complaint", complaintRoute);
// app.use("/hrd", hrdRoute);

app.get("/", (req, res) => {
  res.send('App is working')
});

app.post("/login",(req,res)=> {
  const email = req.body.email;
  console.log(req.body.email)
  db.query(`SELECT * FROM user WHERE email = ${db.escape(email)}`,
  (err, result) => {
    console.log(result);
    if (err) {
      return res.send({
        message: err,
      });
    }
    if (result.length) {
      const token = jwt.sign(
        {
          username: result.username,
          id: result.id,
        },
        "hello",
        {
          expiresIn: "1d",
        }
      );
      return res.status(200).send({
        message: "Loggedin",
        token,
        data: result,
      });
    }
  })
});

app.listen(3001,()=> {
  console.log("Server running at 3001");
});
