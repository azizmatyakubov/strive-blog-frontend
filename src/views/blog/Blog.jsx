import React, { useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import { useNavigate, useParams, Link } from "react-router-dom";
import BlogAuthor from "../../components/blog/blog-author/BlogAuthor";
import BlogLike from "../../components/likes/BlogLike";

import "./styles.css";
const Blog = (props) => {
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();
  const data = props.data;
  
  useEffect(() => {
    const { id } = params;
    const blog = data.find((post) => post._id.toString() === id);

    if (blog) {
      setBlog(blog);
      setLoading(false);
    } else {
      navigate("/404");
    }
  }, [data]);

  const download = async () => {
    // try {
    //   let res = await fetch("http://localhost:5000/blogPosts/downloadJson");
    //   let data = await res.json();
    //   console.log(data);
    // } catch (error) {
    //   console.log(error);
    // }
    console.log("wweccc");
  };

  if (loading) {
    return <div>loading</div>;
  } else {
    return (
      <div className="blog-details-root">
        <Container>
          <Link to={`/new/${blog._id}/cover`}>
            <Image
              className="blog-details-cover"
              src={blog.cover}
              alt="Girl in a jacket"
            />
          </Link>
          <div className="blog-details-header">
            <h1 className="blog-details-title">{blog.title}</h1>
            <Link to={`/new/${blog._id}`}>
              <button className="btn btn-light">Edit</button>
            </Link>
            <button onClick={() => download}>Download</button>
          </div>
          <div className="blog-details-container">
            <div className="blog-details-author">
              <BlogAuthor {...blog.author} />
            </div>
            <div className="blog-details-info">
              <div>{blog.createdAt}</div>
              <div>{`${blog.readTime.value} ${blog.readTime.unit} read`}</div>
              <div
                style={{
                  marginTop: 20,
                }}
              >
                <BlogLike defaultLikes={["7777"]} onChange={console.log} />
              </div>
            </div>
          </div>

          <div
            dangerouslySetInnerHTML={{
              __html: blog.content,
            }}
          ></div>
        </Container>
      </div>
    );
  }
};

export default Blog;
