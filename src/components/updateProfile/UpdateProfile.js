/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from "react";
//import { Form, Card, Alert } from "react-bootstrap";
//import Button from "@material-ui/core/Button";
import { useAuth } from "../../contexts/AuthContext";
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

const RenderDisplayProjects = ({ pro }) => {
  const { currentUser } = useAuth();
  const [project, setProject] = useState({
    projectName: pro.projectName,
    projectgitlink: pro.projectdetails,
    projectdetails: pro.projectgitlink,
  });
  const projectDataChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };
  const resetForm = () => {};
  const addProject = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3001/projects/update", {
        email: currentUser && currentUser.email,
        id: pro._id,
        projectName: project.projectName,
        projectgitlink: project.projectgitlink,
        projectdetails: project.projectdetails,
      })
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
    console.log(project);
  };
  return (
    <div>
      <Card /* className={ ? "border" : "d-none border"} */>
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
  );
};
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
  const [disproj, setDisproj] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:3001/getProjects")
      .then((response) => response.data)
      .then((response) => addDisplayProj(response))
      .catch((error) => console.log(error));
  }, []);
  var sample;
  const addDisplayProj = async (dis) => {
    sample = await dis.filter(
      (pro) => pro.email === (currentUser && currentUser.email)
    );
    await setValue(sample);
    await setDisproj(sample);
    console.log(sample, "sample");
  };
  const setValue = (te) => {
    setDisproj(te);
    console.log(disproj, "project");
  };

  const [inputField, setInputField] = useState({
    name: "",
    email: currentUser && currentUser.email,
    college: "",
    githublink: "",
    imageUrl: "",
    designation: "",
    twitter: "",
    linkedin: "",
    blogs: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/getuser")
      .then((response) => response.data)
      .then((response) => addDetails(response))
      .catch((error) => console.log(error));
  }, []);
  const addDetails = async (det) => {
    /* console.log(det) */
    let user = (await currentUser) && currentUser.email;
    let temp = det.filter((de) => de.email === user);
    /* console.log(temp,"vini") */
    await setDetails(temp);
    //  console.log(details[0],"vijay")
    await temp.map((de) =>
      setInputField({
        //changes made here
        name: de.name,
        email: de.email,
        college: de.college,
        githublink: de.githublink,
        imageUrl: de.imageUrl,
        designation: de.designation,
        twitter: de.twitter,
        linkedin: de.linkedin,
        blogs: de.blogs,
      })
    );
    console.log(inputField.name, "account");
  };

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
  ///currentUser

  //useHistory
  const history = useHistory();

  const classes = useStyles();

  const addUser = async (e) => {
    e.preventDefault();
    /* if (inputField.email !== currentUser.email){
      await currentUser.updateEmail(inputField.email);

      
    } */
    axios
      .put("http://localhost:3001/userdata", {
        name: inputField.name,
        email: inputField.email,
        college: inputField.college,
        githublink: inputField.githublink,
        imageUrl: inputField.imageUrl,
        designation: inputField.designation,
        twitter: inputField.twitter,
        linkedin: inputField.linkedin,
        blogs: inputField.blogs,
      })
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
    console.log(inputField.email, "vinoth");
    /* setInputField({
      name: "",
      email: "",
      college: "",
      githublink: "",
      imageUrl: "",
    }); */
  };
  const addProject = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3001/projects", {
        email: inputField.email,
        projectName: project.projectName,
        projectgitlink: project.projectgitlink,
        projectdetails: project.projectdetails,
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

  /*  const displayProject = disproj.map((proj) => {
    return proj.projects.map((pro) => {
      console.log(pro, "projects");
      return (
        <div key={pro._id}>
          <RenderDisplayProjects pro={pro} />
        </div>
      );
    });
  }); */
  //console.log("proje", sample);
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
                    type="text"
                    name="imageUrl"
                    value={inputField.imageUrl}
                    onChange={dataChange}
                    placeholder="Enter Your google drive Image link"
                  />
                </Form.Group>
                <Form.Group as={Col} id="email">
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
                    defaultValue={currentUser && currentUser.email}
                    onChange={dataChange}
                    placeholder="Email"
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
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
                <Form.Group as={Col} controlId="designation">
                  <Form.Label>Designation</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="text"
                    name="designation"
                    value={inputField.designation}
                    onChange={dataChange}
                    placeholder="Enter Your Designation"
                  />
                </Form.Group>
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
              <Row className="mb-3">
                <Form.Group as={Col} controlId="twitter">
                  <Form.Label>Twitter </Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="text"
                    name="twitter"
                    value={inputField.twitter}
                    onChange={dataChange}
                    placeholder="Enter Your Twitter profile link"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="linkedin">
                  <Form.Label>LinkedIn </Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="text"
                    name="linkedin"
                    value={inputField.linkedin}
                    onChange={dataChange}
                    placeholder="Enter Your Linkedin profile link"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="blogs">
                  <Form.Label>Website/Blog</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="text"
                    name="blogs"
                    value={inputField.blogs}
                    onChange={dataChange}
                    placeholder="Enter Your Blogs"
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                {/* <Form.Group as={Col} controlId="skills">
                  <Form.Label>Skills</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="text"
                    name="skills"
                    value={inputField.githublink}
                    onChange={dataChange}
                    placeholder="Enter Your Skills"
                  />
                </Form.Group> */}
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
        <div className="col-12">{/* {displayProject} */}</div>
        <Button onClick={handleEdit}>
          <i class="fa fa-plus-square" aria-hidden="true"></i> Add Project
        </Button>
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
