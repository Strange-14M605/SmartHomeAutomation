import { useState, useEffect } from "react";
import "./App.css";

//components
import Navbar from "./components/Navbar";
import Button from "./components/Button";

function App() {
    
  // const [devices, setDevices] = useState([{name:"Fan"}, {name:"TV"}]);
  const [devices, setDevices] = useState([]);

  const getDevices = async () => {
    try {
      const response = await fetch("http://localhost:5000/home");
      const data = await response.json();
      setDevices(data); // Save the fetched data to state
      console.log(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getDevices(); // Fetch devices when component mounts
  }, []);

  return (
    <>
      <Navbar />
      <h2>Smart Home Automation</h2>

      {/* List devices */}

      <table>
        <tbody>
          {devices.map((device) => {
            return (
              <tr>
                <td>{device.name}</td>
                <td>
                  <Button text="Status" />
                </td>
                <td>
                  <Button text="Update" className="btn-outline-warning" />
                </td>
                <td>
                  <Button text="Delete" className="btn-outline-danger" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Button text="New Device" className="btn-outline-success" />
    </>
  );
}

export default App;
