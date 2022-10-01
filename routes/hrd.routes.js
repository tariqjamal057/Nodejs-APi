const express = require("express");
const routes = express.Router();
const db = require("../config/database");

routes.get("/hrd-login",(req,res)=> {
  
  res.render('login.ejs');

});

routes.post("/add-state", (req, res) => {
  const state = req.body.state;
  db.query(
    `INSERT INTO tmstate(state) VALUES (${db.escape(state)})`,
    (err, result) => {
      if (err) {
        throw err;
      } else {
        return res.status(200).send({
          message: "State Added Successfully",
          data: result,
        });
      }
    }
  );
});

routes.post("/add-district", (req, res) => {
  const state = req.body.state;
  const district = req.body.district;
  const pincode = req.body.pincode;
  let sid = 0;

  db.query(
    `SELECT * FROM tmstate WHERE state = ${db.escape(state)}`,
    (err, result) => {
      if (err) {
        throw err;
      }
      if (result.length) {
        sid = result[0].sid;
        db.query(
          `INSERT INTO tmdistrict(sid,pincode,district) VALUES (
                ${db.escape(sid)},
                ${db.escape(pincode)},
                ${db.escape(district)}
            )`,
          (error, response) => {
            if (error) {
              throw error;
            }
            return res.status(200).send({
              message: "District Added Successfully",
              data: response,
            });
          }
        );
      }
    }
  );
});

routes.post("/add-qualification", (req, res) => {
  const qualification = req.body.qualification;
  db.query(
    `INSERT INTO tmqualification(qualification) VALUES (${db.escape(
      qualification
    )})`,
    (err, result) => {
      if (err) {
        throw err;
      }
      return res.status(200).send({
        message: "Qualification Added Successfully",
        data: result,
      });
    }
  );
});
routes.post("/add-company", (req, res) => {
  const comname = req.body.comname;
  const comcategory = req.body.comcategory;
  const comtinno = req.body.comtinno;
  const companno = req.body.companno;
  const companyheadoffice = req.body.companyheadoffice;
  const comregid = req.body.comregid;
  const comestyear = req.body.comestyear;
  const comamdune = req.body.comamdune;
  const ocomid = req.body.ocomid;
  const comlid = req.body.comlid;
  const comlpwd = req.body.comlpwd;

  db.query(
    `INSERT INTO tmcompany(comname,comcategory,comtinno,companno,companyheadoffice,comregid,comestyear,comamdune,ocomid,comlid,comlpwd) VALUES (${db.escape(
      comname
    )},${db.escape(comcategory)},${db.escape(comtinno)},${db.escape(
      companno
    )},${db.escape(companyheadoffice)},${db.escape(comregid)},${db.escape(
      comestyear
    )},${db.escape(comamdune)},${db.escape(ocomid)},${db.escape(
      comlid
    )},${db.escape(comlpwd)})`,
    (err, result) => {
      if (err) {
        throw err;
      } else {
        return res.status(200).send({
          message: "Company Added Successfully",
          data: result,
        });
      }
    }
  );
});

module.exports = routes;
