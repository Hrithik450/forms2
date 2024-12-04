import React from "react";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div>
      <button>
        <Link to="/view-form">View Form</Link>
      </button>
      <button>
        <Link to="/create-form">Create Form</Link>
      </button>
      <button>
        <Link to="/view-forms">Forms</Link>
      </button>
    </div>
  );
};

export default Main;
