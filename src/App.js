import React, { useEffect, useState } from "react";
import NavBar from "./components/navbar/BlogNavbar";
import Footer from "./components/footer/Footer";
import Home from "./views/home/Home";
import Blog from "./views/blog/Blog";
import NewBlogPost from "./views/new/New";
import UploadCover from "./views/uploadCover/UploadCover";
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import Register from "./views/register/Register";
import Login from "./views/login/Login";


function App() {
  const [posts, setPosts] = useState([]);
  const params = useParams()
  const [login, setlogin] = useState(false);

  const isLogIn = localStorage.getItem('token')
  

  useEffect(() => {
    fetchPosts();
    if(isLogIn) {
      setlogin(true)
    }
  }, [params]);

  const fetchPosts = async () => {
    const token = await localStorage.getItem('token')
    console.log(token)
    let res = await fetch("http://localhost:3001/blogPosts/",
      {headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}` }, 
      
    });
    if (res.ok) {
      let data = await res.json();
      setPosts(data);
    }
  };

  return (
    <Router>
      <NavBar login={login} fetchPosts={fetchPosts} />
      <Routes>
        <Route path="/" exact element={<Home data={posts} />} />
        <Route path="/blog/:id" element={<Blog data={posts} />} />
        <Route path="/new" element={<NewBlogPost />} />
        <Route path="/new/:id" element={<NewBlogPost fetchPosts={fetchPosts} />} />
        <Route path="/new/:id/cover" element={<UploadCover />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login login={setlogin} fetchPosts={fetchPosts} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
