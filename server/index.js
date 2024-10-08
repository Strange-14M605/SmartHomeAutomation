import express from "express";
import cors from "cors";
import pool from "./db.js";
import bodyParser from "body-parser";

const app = express();
const port = 5000;

// Middleware
app.use(cors());
// app.use(express.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
//login - authentication

//sign up - insert new user
app.post("/user", async(req,res)=>{
  try {
    const {user_ID, name, mobile, password, role, dob} = req.body;
    await pool.query("INSERT INTO user VALUES (?,?,?,?,?,?)", [user_ID, name, mobile, password, role, dob]);
    res.json(req.body);
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ error: "Database error" });
  }
})

//delete user

//display all devices
app.get("/home", async (req, res) => {
  try {
    const [devices] = await pool.query("SELECT * FROM device");
    res.json(devices);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Database error" });
  }
});

//change device status & update log

//insert new device - admin only
app.post("/home", async(req,res)=>{
  try {
    const {device_ID, status, name, model, version} = req.body;
    await pool.query("INSERT INTO device VALUES (?,?,?,?,?)", [device_ID, status, name, model, version]);
    res.json(req.body);
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ error: "Database error" });
  }
})

//update device - admin only

//delete device - admin only

//display all logs - admin only
app.get("/logs", async (req, res) => {
  try {
    const [logs] = await pool.query("SELECT * FROM logs");
    res.json(logs);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Database error" });
  }
});

//display all maintenance - admin only
app.get("/maintenance", async (req, res) => {
    try {
      const [maintenance] = await pool.query("SELECT * FROM maintenance");
      res.json(maintenance);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Database error" });
    }
  });
  
//maintenance notification - admin only

//insert maintenance - admin only
app.post("/maintenance", async(req,res)=>{
  try {
    const {session_ID, device_ID, date, issue_reported, next_maintenance_date} = req.body;
    await pool.query("INSERT INTO maintenance VALUES (?,?,?,?,?)", [session_ID, device_ID, date, issue_reported, next_maintenance_date]);
    res.json(req.body);
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ error: "Database error" });
  }
})

//display all automations - admin only
app.get("/automation", async (req, res) => {
  try {
    const [automations] = await pool.query("SELECT * FROM automation");
    res.json(automations);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Database error" });
  }
});

//insert new automation - admin only
app.post("/automation", async(req,res)=>{
  try {
    const {automation_ID, device_ID, user_ID, start_time, end_time} = req.body;
    await pool.query("INSERT INTO automation VALUES (?,?,?,?,?)", [automation_ID, device_ID, user_ID, start_time, end_time]);
    res.json(req.body);
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ error: "Database error" });
  }
})

//update automation - admin only

//delete automation - admin only

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
