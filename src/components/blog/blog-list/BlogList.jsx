import React from "react";
import { Col, Row } from "react-bootstrap";
import BlogItem from "../blog-item/BlogItem";

const BlogList = (props) => {
  return (
    <Row>
      {props.posts.map((post) => (
        <Col
          key={post._id}
          md={4}
          style={{
            marginBottom: 50,
          }}
        >
          <BlogItem key={post._id} {...post} />
        </Col>
      ))}
    </Row>
  );
};

export default BlogList;
