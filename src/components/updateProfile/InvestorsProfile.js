import React, { useRef, useState, useEffect } from "react";
//import { Form, Card, Alert } from "react-bootstrap";
//import Button from "@material-ui/core/Button";
import { useAuth } from "../../contexts/AuthContext";

import { Avatar, CssBaseline } from "@material-ui/core";
//import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import InfoIcon from "@material-ui/icons/Info";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Card, Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Header from "../Header";
import axios from "axios";
import { auth } from "../../fireBase/firebase";

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
  const { currentUser, updatePassword, updateEmail } = useAuth();

  const [details, setDetails] = useState();

  const [inputField, setInputField] = useState({
    name: "",
    email: currentUser && currentUser.email,
    mobileNumber: "",
    aboutMe: "",
    imageUrl: "",
  });
  useEffect(() => {
    axios
      .get("http://localhost:3001/getuser")
      .then((response) => addDetails(response.data))
      .catch((error) => console.log(error));
  }, []);
  const addDetails = async (det) => {
    let user = (await currentUser) && currentUser.email;
    let temp = det.filter((de) => de.email === user);
    setDetails(temp);
    setInputField({
      name: details[0].name,
      email: details[0].email,
      college: details[0].college,
      githublink: details[0].githublink,
      imageUrl: "",
    });
    console.log(details[0], "account");
  };

  const [project, setProject] = useState({
    portfolioName: "",
    portfolioWebsiteLink: "",
    portfolioDetails: "",
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

  //useHistory
  const history = useHistory();

  const classes = useStyles();

  const addUser = async (e) => {
    e.preventDefault();
    /* if (inputField.email !== currentUser.email){
      await currentUser.updateEmail(inputField.email);

      
    } */
    axios
      .post("http://localhost:3001/userdata", {
        name: inputField.name,
        email: inputField.email,
        mobileNumber: inputField.mobileNumber,
        aboutMe: inputField.aboutMe,
        imageUrl: inputField.imageUrl,
      })
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
    console.log(inputField, "vinoth");
  };
  const addProject = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3001/projects", {
        email: inputField.email,
        portfolioName: project.portfolioName,
        portfolioDetails: project.portfolioDetails,
        portfolioWebsiteLink: project.portfolioWebsiteLink,
      })
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
    console.log(project);
  };
  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Password does not match!");
    }
    console.log(inputField, "vinoth");

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

    axios
      .post("http://localhost:3001/userdata", {})
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
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
                    placeholder="Enter Your Name"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="image">
                  <Form.Label>Image Url</Form.Label>
                  <Form.Control
                    autoComplete="off"
                    type="text"
                    name="imageUrl"
                    placeholder="Enter Your Profile GoogleDrive URL"
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
                    value={
                      inputField.email === ""
                        ? currentUser && currentUser.email
                        : inputField.email
                    }
                    onChange={dataChange}
                    placeholder="Enter Your Email"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="mobileNumber">
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="text"
                    name="mobileNumber"
                    value={inputField.mobileNumber}
                    onChange={dataChange}
                    placeholder="Enter mobileNumber "
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="aboutMe">
                  <Form.Label>aboutMe</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="text"
                    name="aboutMe"
                    value={inputField.aboutMe}
                    onChange={dataChange}
                    placeholder="Enter Your aboutMe"
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

        <h3>Portfolio</h3>
        <Button onClick={handleEdit}>
          <i class="fa fa-plus-square" aria-hidden="true"></i> Add Portfolio
        </Button>
        <Card className={edit ? "border" : "d-none border"}>
          <Card.Header>Portfolio Details</Card.Header>
          <Form onReset={resetForm} onSubmit={addProject} id="addProjectForm">
            <Card.Body>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="name">
                  <Form.Label>Portfolio Name</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="text"
                    name="portfolioName"
                    value={project.portfolioName}
                    onChange={projectDataChange}
                    placeholder="Enter Your Portfolio Name"
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="portfolioDetails">
                  <Form.Label>Portfolio Details</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="text"
                    name="portfolioDetails"
                    value={project.portfolioDetails}
                    onChange={projectDataChange}
                    placeholder="Enter Portfolio Details"
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="portfolioWebsiteLink">
                  <Form.Label>Portfolio Website Link</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="text"
                    name="portfolioWebsiteLink"
                    value={project.portfolioWebsiteLink}
                    onChange={projectDataChange}
                    placeholder="Enter Your Portfolio Website Link"
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
