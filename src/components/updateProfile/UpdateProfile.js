import React, { useRef, useState } from "react";
//import { Form, Card, Alert } from "react-bootstrap";
//import Button from "@material-ui/core/Button";
import { useAuth } from "../../contexts/AuthContext";

import { Avatar, CssBaseline } from "@material-ui/core";
//import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import InfoIcon from "@material-ui/icons/Info";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Card, Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { Container } from "react-bootstrap";

import { Link, useHistory } from "react-router-dom";
import Header from "../Header";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(0),
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const [inputField, setInputField] = useState({
    name: "",
    email: "",
    college: "",
    githublink: "",
    imageUrl: "",
  });

  const [project, setProject] = useState({
    projectName: "",
    projectgitlink: "",
    projectdetails: "",
  });

  const dataChange = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };

  const projectDataChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    setEdit((edit) => !edit);
  };
  const resetForm = () => {};
  const [edit, setEdit] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser, updatePassword, updateEmail } = useAuth(); ///currentUser

  //useHistory
  const history = useHistory();

  const classes = useStyles();

  const addUser = async(e) => {
    e.preventDefault();
    if (inputField.email !== currentUser.email){
      await updateEmail(inputField.email);
      
    }
    console.log(inputField,"vinoth");
  };
  const addProject = (e) => {
    e.preventDefault();
    console.log(project);
  };
  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Password does not match!");
    }
    console.log(inputField,"vinoth");

    const promises = [];
    setError("");
    setLoading(true);
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        history.push("/home");
      })
      .catch(() => {
        setError(" Failed to Update Account!");
      })
      .finally(() => {
        setLoading(false);
      });

      axios.post('http://localhost:3001/userdata', {})
            .then((response) => console.log(response.data))
            .catch((error) => console.log(error))
  }

  return (
    <>
      <div className="container">
        <Card className="border ">
          <Card.Header>Profile Settings</Card.Header>
          <Form onReset={resetForm} onSubmit={addUser} id="addUserForm">
            <Card.Body>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="text"
                    name="name"
                    value={inputField.name}
                    onChange={dataChange}
                    placeholder="Enter Name"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="image">
                  <Form.Label>Image Url</Form.Label>
                  <Form.Control
                    autoComplete="off"
                    type="file"
                    name="imageUrl"
                    placeholder="Enter URL"
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group id="email">
                  <Form.Label htmlFor="email">
                    Email<span className="text-danger"> *</span>
                  </Form.Label>
                  <Form.Control
                    className="pr-4"
                    type="email"
                    name="email"
                    value={inputField.email}
                    onChange={dataChange}
                    placeholder="Email"
                    defaultValue={currentUser && currentUser.email}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="college">
                  <Form.Label>College</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="text"
                    name="college"
                    value={inputField.college}
                    onChange={dataChange}
                    placeholder="Enter College Name"
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="githublink">
                  <Form.Label>GithubLink</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="text"
                    name="githublink"
                    value={inputField.githublink}
                    onChange={dataChange}
                    placeholder="Enter Your Githublink"
                  />
                </Form.Group>
              </Row>
            </Card.Body>
            <Card.Footer style={{ textAlign: "right" }}>
              <Button size="md" type="submit" variant="success">
                Submit
              </Button>{" "}
              <Button size="md" type="reset" variant="info">
                Reset
              </Button>
            </Card.Footer>
          </Form>
        </Card>

        <h3>Projects</h3>
        <Button onClick={handleEdit}><i class="fa fa-plus-square" aria-hidden="true"></i> Add Project</Button>
        <Card className={edit ? "border" : "d-none border"}>
          <Card.Header>Project Details</Card.Header>
          <Form onReset={resetForm} onSubmit={addProject} id="addProjectForm">
            <Card.Body>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="name">
                  <Form.Label>Project Name</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="text"
                    name="projectName"
                    value={project.projectName}
                    onChange={projectDataChange}
                    placeholder="Enter Name"
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="projectdetails">
                  <Form.Label>Project Details</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="text"
                    name="projectdetails"
                    value={project.projectdetails}
                    onChange={projectDataChange}
                    placeholder="Enter Project Details"
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="projectgitlink">
                  <Form.Label>GithubLink</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="text"
                    name="projectgitlink"
                    value={project.projectgitlink}
                    onChange={projectDataChange}
                    placeholder="Enter Your Githublink"
                  />
                </Form.Group>
              </Row>
            </Card.Body>
            <Card.Footer style={{ textAlign: "right" }}>
              <Button size="md" type="submit" variant="success">
                Submit
              </Button>{" "}
              <Button size="md" type="reset" variant="info">
                Reset
              </Button>
            </Card.Footer>
          </Form>
        </Card>
      </div>
    </>
  );
}
