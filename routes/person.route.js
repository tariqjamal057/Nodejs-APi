const express = require("express");
const routes = express.Router();
const jwt = require("jsonwebtoken");
const db = require("../config/database");
const token = require("../middleware/token.middleware");

routes.post("/person_login", (req, res) => {
  const pid = req.body.pid;
  const pwd = req.body.pwd;
  db.query(
    `select * from ttpdetail where pid = ${db.escape(pid)} && pwd = ${db.escape(
      pwd
    )}`,
    (err, result) => {
      if (err) {
        res.send({
          error: err,
        });
      } else if (!result.length) {
        res.send({
          message: "Email or Password is incorrect",
          error: "email",
        });
      } else if (result.length) {
        const token = jwt.sign(
          {
            id: result[0].pid,
            password: result[0].pwd,
          },
          "hello",
          {
            // expiresIn: "1d",
          }
        );
        return res.status(200).send({
          message: "Loggedin",
          token,
          data: result[0],
        });
      }
    }
  );
});

routes.post("/persondetail", token.checkToken, (req, res) => {
  console.log(req.decoded);
  const pid = req.decoded.id;
  db.query(
    `select * from ttpdetail where pid = ${db.escape(pid)}`,
    (err, result) => {
      if (err) {
        res.send({
          error: err,
        });
      } else if (result.length) {
        res.send({
          data: result[0],
        });
      }
    }
  );
});

// Complaint generation

routes.post("/generate_compalint", token.checkToken, (req, res) => {
  console.log(req.decoded);

  const category = req.body.ccat;
  const description = req.body.description;
  const status = "pe";
  const pid = req.decoded.id;

  db.query(
    `insert into ttcomplaint(ccat, description, status, eid) values(${db.escape(
      category
    )}, ${db.escape(description)}, ${db.escape(status)}, ${db.escape(pid)})`,
    (err, result) => {
      if (err) {
        res.send({
          error: err,
        });
      } else if (result) {
        res.send({
          info: "created",
          message: "Complaint generated successfully",
          data: result,
        });
      }
    }
  );
});

routes.get("/recent_complaint", token.checkToken, (req, res) => {
  console.log(req.decoded);
  const pid = req.decoded.id;
  db.query(
    `select * from ttcomplaint where eid =  ${db.escape(
      pid
    )} order by cid desc limit 10`,
    (err, result) => {
      if (err) {
        res.send({
          error: err,
        });
      } else if (result) {
        res.send({
          data: result,
        });
      }
    }
  );
});

routes.get("/all_complaint", token.checkToken, (req, res) => {
  console.log(req.decoded);
  const pid = req.decoded.id;
  db.query(
    `select * from ttcomplaint where eid =  ${db.escape(pid)}`,
    (err, result) => {
      if (err) {
        res.send({
          error: err,
        });
      } else if (result) {
        res.send({
          data: result,
        });
      }
    }
  );
});

routes.post("/get_complaint_by_id", token.checkToken, (req, res) => {
  console.log(req.decoded);
  const pid = req.decoded.id;
  const cid = req.body.cid;
  console.log(pid);
  db.query(
    `select * from ttcomplaint where eid =  ${db.escape(
      pid
    )} && cid = ${db.escape(cid)}`,
    (err, result) => {
      if (err) {
        res.send({
          error: err,
        });
      } else if (result) {
        res.send({
          data: result[0],
        });
      }
    }
  );
});

routes.post("/update_complaint_by_id", token.checkToken, (req, res) => {
  console.log(req.decoded);
  const pid = req.decoded.id;
  const cid = req.body.cid;
  const desc = req.body.desc;
  console.log(pid);
  db.query(
    `update ttcomplaint set description = ${db.escape(
      desc
    )} where eid =  ${db.escape(pid)} and cid = ${db.escape(cid)}`,
    (err, result) => {
      if (err) {
        res.send({
          error: err,
        });
      } else if (result) {
        res.send({
          info: "created",
          message: "Complaint updated successfully",
          data: result[0],
        });
      }
    }
  );
});

// Incharge routes
routes.post("/get_incharge_complaints", token.checkToken, (req, res) => {
  console.log(req.decoded);
  const pid = req.decoded.id;
  console.log(pid);
  db.query(
    `select ttcomplaint.cid ,ttcomplaint.ccat,ttcomplaint.description,ttcomplaint.status from ttcomplaint join tmcategory on tmcategory.cid = ttcomplaint.ccat where ttcomplaint.eid = ${db.escape(
      pid
    )};`,
    (err, result) => {
      if (err) {
        res.send({
          error: err,
        });
      } else if (result) {
        res.send({
          data: result,
        });
      }
    }
  );
});

routes.post("/update_status_by_id", token.checkToken, (req, res) => {
  console.log(req.decoded);
  const pid = req.decoded.id;
  const cid = req.body.cid;
  const status = req.body.status;
  console.log(status);
  console.log(cid);
  var date = null;
  if(status === "cl") {
    date = new Date();
  }
  console.log(date);
  db.query(
    `update ttcomplaint set status = ${db.escape(
      status
    )}, cldate = ${db.escape(date)} where eid =  ${db.escape(pid)} and cid = ${db.escape(cid)}`,
    (err, result) => {
      if (err) {
        res.send({
          error: err,
        });
      } else if (result) {
        res.send({
          info: "created",
          message: "Status updated successfully",
          data: result[0],
        });
      }
    }
  );
});

module.exports = routes;
