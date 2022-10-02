const express = require("express");
const cors = require('cors')
const mysql = require("mysql2");

const db = mysql.createConnection({
    host: 'bo6j9vxbokcmj3tmsd2e-mysql.services.clever-cloud.com',
    user: 'uhy07diumnxfr5s4',
    database: 'bo6j9vxbokcmj3tmsd2e',
    password: '9Zg9tFffPWeZsu0B2M1s',
    port: '3306'
});
db.connect();

const app = express();
app.use(express.json());

app.use(cors({
  origin: "*"
}))


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
      return res.status(200).send({
        message: "Loggedin",
        data: result,
      });
    }
  })
});

app.listen(3001,()=> {
  console.log("Server running at 3001");
});
