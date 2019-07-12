import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div >
      <nav>
        <ul className='buttons'>
          <li>
            <NavLink className="nav" to="/admin">
              <button data-hover="click me!">
                <div>Admin?</div>
              </button>
            </NavLink>
            <span />
            <span />
            <span />
            <span />
          </li>
          <li>
            <NavLink className="nav" to="/student">
              <button data-hover="click me!">
                <div>student?</div>
              </button>
            </NavLink>
            <span />
            <span />
            <span />
            <span />
          </li>
          <li>
            <NavLink className="nav" to="/mentor">
              <button data-hover="click me!">
                <div>Mentor?</div>
              </button>
            </NavLink>
            <span />
            <span />
            <span />
            <span />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
