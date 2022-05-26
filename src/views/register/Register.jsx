import React, { useState } from "react";
import { Container } from "react-bootstrap";
import "./styles.css";

const Register = () => {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const register = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:3001/users/register", {
        method: "POST",
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        console.log("new user added");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <form onSubmit={register}>
        <div class="form-group register-container">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <small id="emailHelp" class="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>

        <div class="form-group">
          <label for="exampleInputPassword1">FirstName</label>
          <input
            type="FirstName"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="FirstName"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div class="form-group">
          <label for="exampleInputLastName">LastName</label>
          <input
            type="LastName"
            class="form-control"
            id="exampleInputLastName"
            placeholder="LastName"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div class="form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1" />
          <label class="form-check-label" for="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </Container>
  );
};

export default Register;
