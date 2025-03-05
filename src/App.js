import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateBlog from './pages/CreateBlog';
import MyBlog from './pages/MyBlog';
import Home from './pages/Home'
import MyProfile from './pages/MyProfile';
import BlogDetail from './pages/BlogDetail'
import Footer from './components/Footer';
import AdminPanel from './pages/AdminPanel';
import AllBlog from './pages/AllBlogs';
import AllUsers from './pages/AllUsers';
import EditBlog from './pages/EditBlog';
import Logout from './pages/Logout'
import './App.css'



function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  return (

    <Router>
      <Navbar token={token} />
      {!token ? <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs/:slug" element={<BlogDetail />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />

      </Routes> :
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/allblogs" element={<AllBlog/>} />
          <Route path="/allusers" element={<AllUsers/>} />
          <Route path="/adminpanel" element={<AdminPanel/>} />
          <Route path="/blogs/:slug" element={<BlogDetail />} />
          <Route path="/myprofile" element={<MyProfile setToken={setToken} />} />
          <Route path="/createBlog" element={<CreateBlog />} />
          <Route path="/edit/:slug" element={<EditBlog />} />
          <Route path="/myBlog" element={<MyBlog />} />
          {/* <Route path="/logout" element={<Logout setToken={setToken} />} /> */}

        </Routes>
      }

      <Footer />

    </Router>
  );
}

export default App;
