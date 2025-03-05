import React from 'react';
import { useNavigate } from 'react-router-dom';

function Logout({ setToken }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-400 to-yellow-400">
 
      <button
        className="px-6 py-3 text-white font-bold bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 hover:scale-105 transition-transform duration-200 active:scale-95"
        onClick={handleLogout}
      >
        Logout
      </button>
    
 </div>
    
  );
}

export default Logout;
