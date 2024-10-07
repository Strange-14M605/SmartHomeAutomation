import React from "react";

function Button({ className = "btn-primary", text = "Click Me!" }) {
  return (
    <div className={`button ${className}`}>
      <button className={`btn ${className}`}>{text}</button>
    </div>
  );
}

export default Button;
