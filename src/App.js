import React, { useEffect, useState } from "react";
import NavBar from "./components/navbar/BlogNavbar";
import Footer from "./components/footer/Footer";
import Home from "./views/home/Home";
import Blog from "./views/blog/Blog";
import NewBlogPost from "./views/new/New";
import UploadCover from "./views/uploadCover/UploadCover";
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";


function App() {
  const [posts, setPosts] = useState([]);
  const params = useParams()

  useEffect(() => {
    fetchPosts();
  }, [params]);

  const fetchPosts = async () => {
    let res = await fetch("https://blog-api-strive.herokuapp.com/blogPosts", {
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
        <Route path="/new/:id/cover" element={<UploadCover />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
