const express = require("express");
const routes = express.Router();
const db = require("../config/database");
const token = require("../middleware/token.middleware");
const schedule = require("node-schedule");

routes.post("/add", token.checkToken, (req, res, next) => {
  const category = req.body.name;
  const seviarity = req.body.c_seviarity;
  const description = req.body.c_description;
  const hide_details = req.body.c_hideflag;

  const user = req.decoded.id;

  db.query(
    `SELECT * FROM category WHERE name = ${db.escape(category)}`,
    (err, result) => {
      if (err) {
        throw err;
      }
      if (result.length) {
        const category_id = result[0].id;
        db.query(
          `INSERT INTO ttcomplaint(c_eid,c_category,c_seviarity,c_description,c_hideflag,c_date) VALUES (
                ${db.escape(user)},
                ${db.escape(category_id)},
                ${db.escape(seviarity)},
                ${db.escape(description)},
                ${db.escape(hide_details)},
                NOW()
            )`,
          (error, response) => {
            if (error) {
              throw error;
            } else {
              return res.status(201).send({
                message: response,
              });
            }
          }
        );
      } else {
        db.query(
          `INSERT INTO category(name) VALUES(${db.escape(category)})`,
          (category_error, category_response) => {
            if (category_error) {
              throw category_error;
            }
            db.query(
              `SELECT * FROM category WHERE name = ${db.escape(category)}`,
              (error, response) => {
                if (error) {
                  throw error;
                }
                if (response.length) {
                  const category_id = response[0].id;
                  db.query(
                    `INSERT INTO ttcomplaint(c_eid,c_category,c_seviarity,c_description,c_hideflag,c_date) VALUES (
                ${db.escape(user)},
                ${db.escape(category_id)},
                ${db.escape(seviarity)},
                ${db.escape(description)},
                ${db.escape(hide_details)},
                NOW()
            )`,
                    (error, response) => {
                      if (error) {
                        throw error;
                      } else {
                        return res.status(201).send({
                          message: response,
                        });
                      }
                    }
                  );
                }
              }
            );
          }
        );
      }
    }
  );
});

routes.patch("/update/:c_id", token.checkToken, (req, res, next) => {
  const category = req.body.name;
  const seviarity = req.body.c_seviarity;
  const description = req.body.c_description;
  const c_id = req.params.c_id;

  db.query(
    `SELECT * FROM category WHERE name = ${db.escape(category)}`,
    (err, result) => {
      if (err) {
        throw err;
      }
      if (result.length) {
        const category_id = result[0].id;
        db.query(
          `UPDATE ttcomplaint SET c_category = ${db.escape(
            category_id
          )},c_seviarity = ${db.escape(seviarity)},c_description = ${db.escape(
            description
          )},c_date = NOW() 
          WHERE c_id = ${db.escape(c_id)}`,
          (error, response) => {
            if (error) {
              throw error;
            } else {
              return res.status(201).send({
                message: "Complaint Updated successfully",
                data: response,
              });
            }
          }
        );
      } else {
        db.query(
          `INSERT INTO category(name) VALUES(${db.escape(category)})`,
          (category_error, category_response) => {
            if (category_error) {
              throw category_error;
            }
            db.query(
              `SELECT * FROM category WHERE name = ${db.escape(category)}`,
              (error, response) => {
                if (error) {
                  throw error;
                }
                if (response.length) {
                  const category_id = response[0].id;
                  db.query(
                    `UPDATE ttcomplaint SET c_category = ${db.escape(
                      category_id
                    )},c_seviarity = ${db.escape(
                      seviarity
                    )},c_description = ${db.escape(description)},c_date = NOW() 
                    WHERE c_id = ${db.escape(c_id)}`,
                    (error, response) => {
                      if (error) {
                        throw error;
                      } else {
                        return res.status(201).send({
                          message: "Complaint Updated successfully",
                          data: response,
                        });
                      }
                    }
                  );
                }
              }
            );
          }
        );
      }
    }
  );
});

routes.get("/view/:c_id", token.checkToken, (req, res, next) => {
  const id = req.params.c_id;
  db.query(
    `SELECT * FROM ttcomplaint WHERE c_id = ${db.escape(id)}`,
    (err, result) => {
      if (err) {
        throw err;
      }
      if (result.length) {
        return res.status(200).send({
          data: result,
        });
      }
    }
  );
});

routes.post("/delete/:c_id", token.checkToken, (req, res, next) => {
  const id = req.params.c_id;
  const reason = req.body.reason;
  db.query(
    `SELECT * FROM ttcomplaint WHERE c_id = ${db.escape(id)}`,
    (err, result) => {
      if (err) {
        throw err;
      }
      if (result.length) {
        db.query(
          `DELETE FROM ttcomplaint WHERE c_id = ${db.escape(id)}`,
          (d_error, d_response) => {
            if (d_error) {
              throw d_error;
            }
            db.query(
              `INSERT INTO ttdelete(c_id,reason,dod) VALUES (${db.escape(
                id
              )},${db.escape(reason)},NOW())`,
              (error, response) => {
                if (error) {
                  throw error;
                }
                return res.status(201).send({
                  message: "message deleted successfully",
                  data: d_response,
                });
              }
            );
          }
        );
      } else {
        return res.status(404).send({
          message: "No Complaint found to delete",
        });
      }
    }
  );
});

routes.patch("/verify/", (req, res, next) => {
  var count = 0;
  schedule.scheduleJob("cancel-function","*/2 * * * * *", () => {
    if(count < 3) {
        console.log("running")
    }
    else {
        schedule.cancelJob("cancel-function");
    }
    count++;
  });
});

module.exports = routes;
