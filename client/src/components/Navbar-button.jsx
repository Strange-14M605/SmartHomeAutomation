import React from "react";

function Navbar_button({ text = "Default" , url="#"}) {
  return (
    <div className="navbar-button">
      <li className="nav-item">
        <a className="nav-link" href={url}>
          {text}
        </a>
      </li>
    </div>
  );
}

export default Navbar_button;
