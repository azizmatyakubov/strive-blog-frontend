import React, { useEffect, useState } from "react";
import NavBar from "./components/navbar/BlogNavbar";
import Footer from "./components/footer/Footer";
import Home from "./views/home/Home";
import Blog from "./views/blog/Blog";
import NewBlogPost from "./views/new/New";
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";

function App() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    let res = await fetch("http://localhost:5000/blogPosts/", {
      method: "GET",
    });
    if (res.ok) {
      let data = await res.json();
      setPosts(data);
    }
  };

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" exact element={<Home data={posts} />} />
        <Route path="/blog/:id" element={<Blog data={posts} />} />
        <Route path="/new" element={<NewBlogPost />} />
        <Route path="/new/:id" element={<NewBlogPost fetchPosts={fetchPosts} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;