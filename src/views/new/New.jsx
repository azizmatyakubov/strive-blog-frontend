import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";

import { useNavigate, useParams } from "react-router-dom";
import "./styles.css";
const NewBlogPost = (props) => {
  const [text, setText] = useState(""); // content
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [edit, setEdit] = useState(false);

  // functions
  const fetchPostsById = async (id) => {
    let res = await fetch("http://localhost:5000/blogPosts/" + id, {
      method: "GET",
    });
    if (res.ok) {
      let data = await res.json();
      setTitle(data.title);
      setText(data.content);
      setCategory(data.category);
    }
  };

  // get params id
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (params.id) {
      fetchPostsById(params.id);
      setEdit(true);
    }
  }, [params.id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:5000/blogPosts/", {
        method: "POST",
        body: JSON.stringify({ title: title, content: text }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        console.log("new post added");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editHandler = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(`http://localhost:5000/blogPosts/${params.id}`, {
        method: "PUT",
        body: JSON.stringify({
          title: title,
          content: text,
          category: category,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        console.log("new edited");
        props.fetchPosts();
        navigate(`/`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container className="new-blog-container">
      <Form className="mt-5" onSubmit={edit ? editHandler : submitHandler}>
        {/* Title  */}
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            size="lg"
            placeholder="Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </Form.Group>

        {/* Category  */}
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            size="lg"
            placeholder="Title"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          />
        </Form.Group>

        {/* Text  */}
        <Form.Group controlId="blog-content" className="mt-3">
          <Form.Label>Blog Content</Form.Label>
        </Form.Group>

        {/* Buttons  */}
        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button type="reset" size="lg" variant="outline-dark">
            Reset
          </Button>
          <Button
            type="submit"
            size="lg"
            variant="dark"
            style={{
              marginLeft: "1em",
            }}
          >
            {edit ? "Edit" : "Submit"}
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default NewBlogPost;
