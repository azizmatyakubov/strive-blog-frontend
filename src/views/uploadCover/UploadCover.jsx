import React from "react";
import { useState } from "react";
import "./uploadCover.css";
import { Container, Form, Button, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UploadCover = () => {
  const [image, setImage] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  const submitPicture = async (e, _id) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("coverPost", image);
      let res = await fetch(
        "http://localhost:5000/blogPosts/" + params.id + "/uploadCover",
        {
          method: "POST",
          body: data,
        }
      );
      let resData = await res.json();
      if (resData.status === 200) {
        navigate("/");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="new-blog-container">
      <Form className="mt-5" onSubmit={submitPicture}>
        <Row className="d-flex align-items-end">
          <Col md={8}>
            <Form.Group id="formData">
              <Form.Label>Choose your Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                className="mt-1"
              />
            </Form.Group>
          </Col>
          <Col>
            <Button
              type="submit"
              size="lg"
              variant="dark"
              style={{
                marginLeft: "1em",
              }}
            >
              Upload
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default UploadCover;
