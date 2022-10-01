const express = require("express");
const routes = express.Router();
const db = require("../config/database");

routes.post("/add", (req, res, next) => {
  const act = req.body.act;
  const year = req.body.year;
  db.query(
    `SELECT * FROM rules WHERE act = ${db.escape(act)};`,
    (error, response) => {
      if (error) {
        throw error;
        return res.status(400).send({
          message: error,
        });
      }

      if (response.length) {
        return res.status(409).send({
          message: "Act is already created",
          data: response,
        });
      } else {
        db.query(
          `INSERT INTO rules(act,year,date) VALUES (
                ${db.escape(act)},
                ${db.escape(year)},
                NOW()
            );`,
          (err, result) => {
            if (err) {
              throw err;
              return res.status(400).send({
                message: err,
              });
            }
            console.log(result);
            return res.status(201).send({
              message: "Act Created Successfully",
              data: result,
            });
          }
        );
      }
    }
  );
});

routes.patch("/update/:id", (req, res, next) => {
  const id = req.params.id;
  const act = req.body.act;
  const year = req.body.year;
  db.query(
    `SELECT * FROM rules WHERE id = ${db.escape(id)};`,
    (error, response) => {
      if (error) {
        throw error;
        return res.status(400).send({
          message: error,
        });
      }

      if (response.length) {
        db.query(
          `UPDATE rules SET act = ${db.escape(act)},year = ${db.escape(
            year
          )} WHERE id = ${db.escape(id)}`,
          (err, result) => {
            if (err) {
              throw err;
              return res.status(400).send({
                message: err,
              });
            }
            console.log(result);
            return res.status(201).send({
              message: "Act updated Successfully",
              data: result,
            });
          }
        );
      } else {
        return res.status(404).send({
          message: "No data found to update",
        });
      }
    }
  );
});

routes.delete("/delete/:id", (req, res, next) => {
  const id = req.params.id;
  db.query(
    `SELECT * FROM rules WHERE id = ${db.escape(id)};`,
    (error, response) => {
      if (error) {
        throw error;
        return res.status(400).send({
          message: error,
        });
      }

      if (response.length) {
        db.query(
          `DELETE FROM rules WHERE id = ${db.escape(id)};`,
          (err, result) => {
            if (err) {
              throw err;
              return res.status(400).send({
                message: err,
              });
            }
            return res.status(204).send({
              message: "User deleted successfully",
              data: result,
            });
          }
        );
      } else {
        return res.status(404).send({
          message: "No data found to delete",
        });
      }
    }
  );
});

routes.get("/rules", (req, res) => {
  db.query(`SELECT * FROM rules`, (err, result) => {
    if (err) {
      throw err;
    } else {
      return res.status(200).send({
        data: result,
      });
    }
  });
});

module.exports = routes;
