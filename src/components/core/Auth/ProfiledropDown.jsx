import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import { logout } from '../../../services/operations/authAPI'; // Import logout function

const ProfiledropDown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate("/"); // Initialize navigate

  return (
    <div>
      <button onClick={() => dispatch(logout(navigate))}>Logout</button>
    </div>
  );
}

export default ProfiledropDown;
