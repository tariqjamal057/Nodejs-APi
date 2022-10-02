const express = require("express");
const routes = express.Router();
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/database");
const middleware = require("../middleware/user.middleware");
const token = require("../middleware/token.middleware");
var nodemailer = require("nodemailer");

// routes.post("/register", middleware.validateRegister, (req, res, next) => {
//   const name = req.body.name;
//   const dob = req.body.dob;
//   const gender = req.body.gender;
//   const qualification = req.body.qualification;
//   const address = req.body.address;
//   const email = req.body.email;
//   const password = req.body.password;
//   const phone_number = req.body.phonenumber;
//   const company_name = req.body.companyname;
//   const location = req.body.location;
//   let c_id = 0;

//   db.query(
//     `SELECT * FROM ttuser WHERE email = ${db.escape(email)}`,
//     (err, result) => {
//       if (result.length) {
//         return res.status(409).send({
//           message: "Email is already in use",
//         });
//       } else {
//         bcrypt.hash(password, 10, (err, hash) => {
//           if (err) {
//             // throw err;
//             return res.status(500).send({
//               message: err,
//             });
//           } else {
//             db.query(
//               `SELECT * FROM tmcompany WHERE comname = ${db.escape(
//                 company_name
//               )}`,
//               (c_err, c_res) => {
//                 if (c_err) {
//                   return res.status(400).send({
//                     message: "Something went wrong",
//                   });
//                 }
//                 if (c_res.length) {
//                   console.log(c_res[0].comid);
//                   c_id = c_res[0].comid;
//                   db.query(
//                     `SELECT * FROM tmdistrict WHERE district = ${db.escape(
//                       location
//                     )}`,
//                     (l_err, l_res) => {
//                       if (l_err) {
//                         return res.status(400).send({
//                           message: "Something went wrong",
//                         });
//                       }
//                       if (l_res.length) {
//                         console.log(l_res[0].did);
//                         l_id = l_res[0].did;
//                         db.query(
//                           `SELECT * FROM tmqualification WHERE qualification = ${db.escape(
//                             qualification
//                           )}`,
//                           (q_err, q_res) => {
//                             if (q_err) {
//                               return res.status(400).send({
//                                 message: "Something went wrong",
//                               });
//                             }
//                             if (q_res.length) {
//                               console.log(q_res[0].qid);
//                               q_id = q_res[0].qid;

//                               db.query(
//                                 `INSERT INTO ttuser(name,email,password,phonenumber,dob,gender,qualification,address,companyname,location) VALUES (
//                                       ${db.escape(name)},
//                                         ${db.escape(email)},
//                                         ${db.escape(hash)},
//                                         ${db.escape(phone_number)},
//                                         ${db.escape(dob)},
//                                         ${db.escape(gender)},
//                                         ${db.escape(q_id)},
//                                         ${db.escape(address)},
//                                         ${db.escape(c_id)},
//                                         ${db.escape(l_id)}
//                                         );`,
//                                 (err, result) => {
//                                   if (err) {
//                                     throw err;
//                                     return res.status(400).send({
//                                       message: err,
//                                     });
//                                   }
//                                   console.log(result);
//                                   return res.status(201).send({
//                                     message: "Registered",
//                                   });
//                                 }
//                               );
//                             }
//                           }
//                         );
//                       }
//                     }
//                   );
//                 }
//               }
//             );
//           }
//         });
//       }
//     }
//   );
// });

// const updateLastLogin = (email) => {
//   db.query(
//     `UPDATE ttuser SET 
//   _islastlogin = NOW() WHERE email = ${db.escape(email)}
//   `,
//     (u_err, u_response) => {
//       if (u_err) {
//         throw u_err;
//       }
//       console.log(u_response);
//     }
//   );
// };

// routes.post("/login", middleware.validateLogin, (req, res, next) => {
//   console.log("75")
//   console.log(req.body.email)
//   const email = req.body.email;
//   const password = req.body.password;
//   db.query(
//     `SELECT * FROM ttuser WHERE email = ${db.escape(email)}`,
//     (err, result) => {
//       console.log(result);
//       if (err) {
//         throw err;
//         return res.send({
//           message: err,
//         });
//       }
//       if (!result.length) {
//         res.render("profile.ejs", { message: "Email is incorrect" });
//       } else {
//         bcrypt.compare(password, result[0]["password"], (error, hashresult) => {
//           if (error) {
//             throw error;
//             return res.send({
//               message: "Username is incorrect",
//             });
//           }
//           if (hashresult) {
//             const token = jwt.sign(
//               {
//                 username: result[0].username,
//                 id: result[0].id,
//               },
//               "hello",
//               {
//                 expiresIn: "1d",
//               }
//             );
//             // updateLastLogin(email);
//             if (result[0].role === "employee") {
//               return res.status(200).send({
//                 data: result[0],
//               });
//             } else {
//               return res.status(200).send({
//                 message: "Loggedin",
//                 token,
//                 data: result[0],
//               });
//             }
//           }
//           console.log(hashresult);
//           return res.status(200).send({
//             message: "Password is incorrect",
//           });
//         });
//       }
//     }
//   );
// });

routes.post("/login", middleware.validateLogin, (req, res, next) => {
  const email = req.body.email;
  const password = '123';
  db.query(
    `SELECT * FROM ttuser WHERE email = ${db.escape(email)}`,
    (err, result) => {
      console.log(result);
      if (err) {
        throw err;
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
        // updateLastLogin(email);
        if (result.role === "employee") {
          return res.status(200).send({
            data: result,
          });
        } else {
          return res.status(200).send({
            message: "Loggedin",
            token,
            data: result,
          });
        }
      } 
    }
  );
});


routes.patch("/profile/update", token.checkToken, (req, res, next) => {
  const qualification = req.body.qualification;
  const address = req.body.address;
  const company_name = req.body.c_name;
  const company_location = req.body.location;
  const id = req.decoded.id;
  console.log(id);
  db.query(
    `SELECT * FROM ttuser WHERE id = ${db.escape(id)}`,
    (err, result) => {
      console.log(result);
      if (err) {
        throw err;
        return res.status(400).send({
          message: err,
        });
      }
      if (!result.length) {
        return res.status(400).send({
          message: "Something went wrong",
        });
      } else {
        db.query(
          `SELECT * FROM company WHERE c_name = ${db.escape(company_name)}`,
          (error, response) => {
            if (error) {
              return res.status(400).send({
                message: "Something went wrong",
              });
            }
            if (response.length) {
              console.log(response[0].id);
              c_id = response[0].id;

              db.query(
                `UPDATE ttuser SET 
                    qualification = ${db.escape(qualification)},
                    address = ${db.escape(address)},
                    c_id = ${db.escape(c_id)} 
                    WHERE id = ${db.escape(id)};`,
                (err, result) => {
                  if (err) {
                    throw err;
                    return res.status(400).send({
                      message: err,
                    });
                  }
                  console.log(result);
                  return res.status(200).send({
                    message: "Updated",
                    data: result,
                  });
                }
              );
            } else {
              db.query(
                `INSERT INTO company(c_name,location) VALUES (${db.escape(
                  company_name
                )},${db.escape(company_location)})`,
                (c_err, c_response) => {
                  if (c_err) {
                    throw c_err;
                    return res.status(400).send({
                      message: c_err,
                    });
                  }
                  console.log(result);
                  return res.status(201).send({
                    message: "Registered",
                    data: c_response,
                  });
                }
              );
              db.query(
                `SELECT id FROM company WHERE c_name = ${db.escape(
                  company_name
                )}`,
                (com_err, com_response) => {
                  if (com_err) {
                    return res.status(400).send({
                      message: com_err,
                    });
                  }
                  if (com_response.length) {
                    console.log(com_response.id);
                    c_id = com_response.id;
                    console.log(c_id);

                    db.query(
                      `UPDATE ttuser SET 
                        qualification = ${db.escape(qualification)},
                        address = ${db.escape(address)},
                        c_id = ${db.escape(c_id)} 
                        WHERE id = ${db.escape(id)};`,
                      (err, result) => {
                        if (err) {
                          throw err;
                          return res.status(400).send({
                            message: err,
                          });
                        }
                        console.log(result);
                        return res.status(200).send({
                          message: "Updated",
                        });
                      }
                    );
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});

routes.get("/profile", (req, res, next) => {
  const id = 1;
  console.log(id);
  db.query(
    `SELECT * FROM ttuser WHERE id = ${db.escape(id)}`,
    (err, result) => {
      console.log(result);
      if (err) {
        throw err;
        return res.status(400).send({
          message: err,
        });
      }
      if (!result.length) {
        return res.status(400).send({
          message: "Something went wrong",
        });
      } else {
        return res.status(400).send({
          data: result,
        });
      }
    }
  );
});

let otp = 0;

routes.get("/send_email_otp", (req, res) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "19ita57@karpagamtech.ac.in",
      pass: "Jamal@123",
    },
  });
  otp = Math.floor(1000 + Math.random() * 9000);
  var mailOptions = {
    from: "19ita57@karpagamtech.ac.in",
    to: "19ita57@karpagamtech.ac.in",
    subject: "Sending Email using Node.js",
    text: "${otp}" + otp,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
});

routes.get("/send_mobile_otp", (req, res) => {
  var sid = "ACc105a414a397605acf4c312705241635";
  var auth_token = "5f712f02b17fc0b53f219fd97751fed6";

  var twilio = require("twilio")(sid, auth_token);
  otp = Math.floor(1000 + Math.random() * 9000);
  twilio.messages
    .create({
      from: "+15853265855",
      to: "+919087164081",
      body: otp,
    })
    .then(function (res) {
      console.log("message has sent!", otp);
    })
    .catch(function (err) {
      console.log(err);
    });
});

routes.get("/verify_email/", (req, res) => {
  var otp = req.body.otp;
  console.log(otp);
  res.send(otp);
});
module.exports = routes;
