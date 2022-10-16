const express = require("express");
const routes = express.Router();
const jwt = require("jsonwebtoken");
const db = require("../config/database");
const token = require("../middleware/token.middleware");

// Department Routes

routes.post("/add_dept", (req, res) => {
  const dept = req.body.dname;

  if (!dept) {
    res.send({
      info: "empty",
      message: "Department could not be empty",
    });
  } else {
    db.query(
      `insert into tmdept(dname) values (${db.escape(dept)})`,
      (err, result) => {
        if (err) {
          res.send({
            error: err,
          });
        } else if (result) {
          res.send({
            info: "created",
            message: "Dapartment added successfully",
            data: result,
          });
        }
      }
    );
  }
});

routes.get("/departments", (req, res) => {
  db.query(`select * from tmdept`, (err, result) => {
    if (err) {
      res.send({
        error: err,
      });
    } else if (result) {
      res.send({
        data: result,
      });
    }
  });
});

routes.post("/department", (req, res) => {
  const did = req.body.did;
  db.query(
    `select * from tmdept where did = ${db.escape(did)}`,
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

routes.post("/update_department", (req, res) => {
  const did = req.body.did;
  const dname = req.body.dname;
  db.query(
    `update tmdept set dname = ${db.escape(dname)} where did = ${db.escape(
      did
    )};`,
    (err, result) => {
      if (err) {
        res.send({
          error: err,
        });
      } else if (result) {
        res.send({
          info: "created",
          message: "Dapartment updated successfully",
          data: result,
        });
      }
    }
  );
});

// Register person

routes.post("/register_employee", (req, res) => {
  const pid = req.body.pid;
  const pname = req.body.pname;
  const pdept = req.body.pdept;
  const pwd = req.body.pwd;
  const prole = req.body.prole;

  if (!pid) {
    res.send({
      info: "pid_empty",
      message: "Employee ID could not be empty",
    });
  } else if (!pname) {
    res.send({
      info: "pname_empty",
      message: "Employee name could not be empty",
    });
  } else if (!pdept) {
    res.send({
      info: "pdept_empty",
      message: "Employee department could not be empty",
    });
  } else if (!pwd) {
    res.send({
      info: "pwd_empty",
      message: "Password could not be empty",
    });
  } else if (!prole) {
    res.send({
      info: "prole_empty",
      message: "Employee role could not be empty",
    });
  } else {
    db.query(
      `insert into ttpdetail(pid, pname, pdept, pwd, prole) values(${db.escape(
        pid
      )},${db.escape(pname)},${db.escape(pdept)},${db.escape(pwd)},${db.escape(
        prole
      )})`,
      (err, result) => {
        if (err) {
          res.send({
            error: err,
          });
        } else if (result) {
          res.send({
            info: "created",
            message: "User created successfully",
            data: result,
          });
        }
      }
    );
  }
});

routes.get("/persons_details", (req, res) => {
  db.query(`select * from ttpdetail`, (err, result) => {
    if (err) {
      res.send({
        error: err,
      });
    } else if (result) {
      res.send({
        data: result,
      });
    }
  });
});

routes.post("/person_detail", (req, res) => {
  const pid = req.body.pid;
  db.query(
    `select * from ttpdetail where pid = ${db.escape(pid)}`,
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

routes.post("/update_employee", (req, res) => {
  const pid = req.body.pid;
  const pname = req.body.pname;
  const pdept = req.body.pdept;
  const pwd = req.body.pwd;
  const prole = req.body.prole;

  db.query(
    `update ttpdetail set pname = ${db.escape(pname)}, pdept = ${db.escape(pdept)}, pwd = ${db.escape(pwd)}, prole = ${db.escape(prole)} where pid = ${db.escape(pid)}`,
    (err, result) => {
      if (err) {
        res.send({
          error: err,
        });
      } else if (result) {
        res.send({
          info: "created",
          message: "User Updated successfully",
          data: result,
        });
      }
    }
  );
});


// Category routes 

routes.post("/add_category",(req,res)=> {
  const category = req.body.category;
  const eid = req.body.eid;
  
  if(!category) {
    res.send({
      info: "empty",
      message: "Category name could not be empty",
    });
  }
  else {
    db.query(`insert into tmcategory(category, eid) values (${db.escape(category)}, ${db.escape(eid)})`,(err,result)=> {
      if (err) {
        res.send({
          error: err,
        });
      } else if (result) {
        res.send({
          info: "created",
          message: "Category added successfully",
          data: result,
        });
      }
    });
  }
});

routes.get("/categories",(req,res)=> {

  db.query(`select * from tmcategory`,(err,result)=> {
    if (err) {
      res.send({
        error: err,
      });
    } else if (result) {
      res.send({
        data: result,
      });
    }
  });
});

routes.post("/get_category",(req,res)=> {
  const cid = req.body.cid;
  db.query(
    `select * from tmcategory where cid = ${db.escape(cid)}`,
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
})

routes.post("/update_category",(req,res)=> {
  const cid = req.body.cid;
  const eid = req.body.eid;

  if(eid) {
    db.query(`update tmcategory set eid = ${db.escape(eid)} where cid = ${db.escape(cid)};`,(err,result)=> {
      if (err) {
        res.send({
          error: err,
        });
      } else if (result) {
        res.send({
          info: "created",
          message: "Category updated successfully",
          data: result,
        });
      }
    });
  }
})


routes.get("/get_total_student",(req,res)=> {
  db.query(`select count(pid) as student from ttpdetail where prole = "s"`,(err,result)=> {
    if (err) {
      res.send({
        error: err,
      });
    } else if (result) {
      res.send({
        data: result
      });
    }
  })
});

routes.get("/get_total_employees",(req,res)=> {
  db.query(`select count(pid) as employee from ttpdetail where prole = "e"`,(err,result)=> {
    if (err) {
      res.send({
        error: err,
      });
    } else if (result) {
      res.send({
        data: result
      });
    }
  })
});

routes.get("/get_total_pending_complaint",(req,res)=> {
  db.query(`select count(cid) as pending from ttcomplaint where status != "cl"`,(err,result)=> {
    if (err) {
      res.send({
        error: err,
      });
    } else if (result) {
      res.send({
        data: result
      });
    }
  })
});


module.exports = routes;
