import express from "express"
// import cors from "cors"
import pool from "./db.js"
import bodyParser from "body-parser"

const app = express();
const port = 5000;

// Middleware
// app.use(cors());
// app.use(express.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({extended:true}));

//Routes
//get all fest names
app.get("/devices", async(req,res)=>{
    try {
        const [allFests] = await pool.query("SELECT * FROM device");
        res.json(allFests);
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ error: "Database error" });
    }
})

//post new fest name
app.post("/newfestname", async(req,res)=>{
    try {
        const {fest_id, fest_name, year, head_teamID} = req.body;
        await pool.query("INSERT INTO fest VALUES (?,?,?,?)", [fest_id, fest_name, year, head_teamID]);
        res.json(req.body)
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ error: "Database error" });
    }
})

//Routes

//login - authentication

//sign up - insert new user

//delete user 

//display all devices

//change device status & update log 

//insert new device - admin only

//update device - admin only

//delete device - admin only 

//display all logs - admin only

//display all maintenance - admin only

//maintenance notification - admin only

//insert maintenance - admin only

//display all automations - admin only

//insert new automation - admin only

//update automation - admin only

//delete automation - admin only 

app.listen(port, ()=>{
    console.log(`Server running on ${port}`);
})