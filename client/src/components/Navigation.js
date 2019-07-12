import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
   
      <div class="container">
       
      <Link to="/LoginStudent">
        <button className='button'>Login Student</button>
      </Link>

      <Link to="/LoginMentors">
        <button className='button'>Login Mentor</button>
      </Link>

      <Link to="/LoginAdmin">
        <button className='button'>Login Admin</button>
      </Link>
    </div>
  );
};

export default Navigation;
