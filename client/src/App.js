import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const[fest, setFest] = useState([]);
  const getFestNames = async ()=>{
    const data = await fetch("http://localhost:5000/festnames")
    const festnames = await data.json()
    // console.log(festnames)
    setFest(festnames)
;  }

  useEffect(() => {
    getFestNames();
  }, []); 

  return (
    <div className="App">
        <h1>SMART HOME</h1>
        {
          fest.map((name)=>{
            return(
              <h2></h2>
            )
          })
        }
    </div>
  );
}

export default App;
