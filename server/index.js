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
//login - authentication *********
app.post("/login", async (req, res) => {
  try {
    const { mobile, password } = req.body;
    const [user] = await pool.query(
      "SELECT * FROM user WHERE mobile = ? AND password = ?",
      [mobile, password]
    );

    if (user.length > 0) {
      res.json({ message: "Login successful", user: user[0] });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Database error" });
  }
});

//sign up - insert new user
app.post("/user", async(req,res)=>{
  try {
    const {user_ID, name, mobile, password, role, dob} = req.body;
    await pool.query(
      "INSERT INTO user VALUES (?,?,?,?,?,?)", 
      [user_ID, name, mobile, password, role, dob]);
    res.json(req.body);
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ error: "Database error" });
  }
})

//delete user **************
app.delete("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await pool.query("DELETE FROM user WHERE user_ID = ?", [
      id,
    ]);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Database error" });
  }
});

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

//change device status & update log  *************************
app.put("/device/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Update device status
    await pool.query("UPDATE device SET status=? WHERE device_ID = ?", [
      status,
      id,
    ]);

    // Insert log for the status update
    await pool.query(
      "INSERT INTO logs (device_ID, status, log_date) VALUES (?,?,NOW())",
      [id, status]
    );

    res.json({ message: "Device status updated and log recorded" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Database error" });
  }
});

//insert new device - admin only
app.post("/home", async(req,res)=>{
  try {
    const {device_ID, status, name, model, version} = req.body;
    await pool.query(
      "INSERT INTO device VALUES (?,?,?,?,?)", 
      [device_ID, status, name, model, version]);
    res.json(req.body);
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ error: "Database error" });
  }
})

//update device - admin only
app.put("/home/:id", async(req,res)=>{
  try {
    const {id} = req.params;
    const {status, name, model, version} = req.body;
    const updateDevice = await pool.query(
      "UPDATE device SET status=?, name=?, model=?, version=? WHERE device_ID = ?",
      [status, name, model, version, id]
    )
    res.json(updateDevice.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Database error" });
  }
})

//delete device - admin only
app.delete("/home/:id", async(req,res)=>{
  try {
    const {id} = req.params;
    const deleteDevice = await pool.query("DELETE FROM device WHERE device_ID=?", [id]);
    res.json(deleteDevice.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Database error" });
  }
})

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
  
//maintenance notification - admin only **********************
app.get("/maintenance/notifications", async (req, res) => {
  try {
    const [maintenanceNotifications] = await pool.query(
      "SELECT * FROM maintenance WHERE next_maintenance_date <= CURDATE()"
    );
    res.json(maintenanceNotifications);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Database error" });
  }
});

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

//update automation - admin only ****************************
app.put("/automation/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { start_time, end_time } = req.body;
    const updateAutomation = await pool.query(
      "UPDATE automation SET start_time=?, end_time=? WHERE automation_ID = ?",
      [start_time, end_time, id]
    );
    res.json({ message: "Automation updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Database error" });
  }
});

//delete automation - admin only *******************
app.delete("/automation/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteAutomation = await pool.query(
      "DELETE FROM automation WHERE automation_ID=?",
      [id]
    );
    res.json({ message: "Automation deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Database error" });
  }
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
