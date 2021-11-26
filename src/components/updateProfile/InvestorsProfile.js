/* eslint-disable no-unused-vars */
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

const RenderDisplayProjects = ({ pro }) => {
  const { currentUser } = useAuth();
  const [project, setProject] = useState({
      portfolioName: pro.portfolioName,
      portfolioDetails: pro.portfolioDetails,
      portfolioWebsiteLink: pro.portfolioWebsiteLink,
  });
  const projectDataChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };
  const resetForm = () => {};
  const addProject = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3001/portfolios/update", { //change
        email: currentUser && currentUser.email,
        id: pro._id,
        portfolioName: project.portfolioName,
        portfolioDetails: project.portfolioDetails,
        portfolioWebsiteLink: project.portfolioWebsiteLink,
      })
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
    console.log(project);
  };
  const handleDelete=async ()=>{
   await axios.put("http://localhost:3001/portfolios/delete",{ //change
      id:pro._id,
      email: currentUser && currentUser.email,
    })
    .then((response) => console.log(response.data))
    .catch((error) => console.log(error));
    await window.location.reload()
  }
  return (
    <div>
     <Card /* className={edit ? "border" : "d-none border"} */>
        <Card.Header>Portfolio Details</Card.Header>
        <Form onReset={resetForm} onSubmit={addProject} id="addPortfolioForm">
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
              Update
            </Button>{" "}
            <Button size="md" type="reset" variant="info">
              Delete
            </Button>
          </Card.Footer>
        </Form>
      </Card>
    </div>
  );
};
//form style
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
//update profile function
export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updatePassword, updateEmail } = useAuth();

  const [details, setDetails] = useState();
  const [disproj, setDisproj] = useState();
  const [invest,setInvest] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/getProjects")//confusion
      .then((response) => response.data)
      .then((response) => addDisplayProj(response))
      .catch((error) => console.log(error)); 
  }, []);
  useEffect(()=>{
    axios.get("http://localhost:3001/getInvestors")
    .then((res)=>addInvestor(res.data))
    .catch((err)=>console.log(err))
    console.log("sdfsd",invest);
  },[])
  const addInvestor = async(data) =>{
    await setInvest(data)
    console.log("dfsadf",invest)
    setInputField({ 
      name: invest.name,
      email: invest.email,
      mobileNumber: invest.mobileNumber,
      designation: invest.designation,
      investortype: invest.investortype,
      investrange: invest.investrange,
      location: invest.location,
      website: invest.website,
      aboutMe: invest.aboutMe,
      imageUrl: invest.imageUrl,
    })
  }
  var sample;
  const addDisplayProj = async (dis) => {
    //await setValue(sample);
    await setDisproj(dis.filter(
      (pro) => pro.email === (currentUser && currentUser.email)
    ));
    console.log(disproj, "sample");
  };
  const setValue = (te) => {

    setDisproj(te);
    console.log(disproj, "project");
  };//newoneadded 

  const [inputField, setInputField] = useState({
    name: "",
    email: currentUser && currentUser.email,
    mobileNumber: "",
    designation: "",
    investortype: "",
    investrange: "",
    location: "",
    website: "",
    aboutMe: "",
    imageUrl: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/getinvestor")//change
      .then((response) => response.data)
      .then((response) => addDetails(response))
      .catch((error) => console.log(error));
  }, []);
  const addDetails = async (det) => {
    let user = (await currentUser) && currentUser.email;
    let temp = det.filter((de) => de.email === user);
    await setDetails(temp);
    await temp.map((de) =>
      setInputField({
        //changes made here
        name: de.name,
        email: de.email,
        mobileNumber: de.mobileNumber,
        designation: de.designation,
        investortype: de.investortype,
        investrange: de.investrange,
        location: de.location,
        website: de.website,
        aboutMe: de.aboutMe,
        imageUrl: de.imageUrl,
      })
    );
    console.log(inputField.name, "account");
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
      .post("http://localhost:3001/investordata", {
        name: inputField.name,
        email: currentUser&&currentUser.email,
        mobileNumber: inputField.mobileNumber,
        imageUrl: inputField.imageUrl,
        designation: inputField.designation,
        investortype: inputField.investortype,
        investrange: inputField.investrange,
        location: inputField.location,
        website: inputField.website,
        aboutMe: inputField.aboutMe
      })
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
    console.log(inputField, "vinoth");
  };
  const addProject = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3001/portfolios", {//change
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
      .post("http://localhost:3001/investordata", {})//change
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  }
  const displayProject = disproj&&disproj.map((proj) => {
    return proj.projects.map((pro) => {
      console.log(pro, "projects");
      return (
        <div key={pro._id}>
          <RenderDisplayProjects pro={pro} />
        </div>
      );
    });
  });

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
                    value={inputField.imageUrl}
                    onChange={dataChange}
                    placeholder="Enter Your Profile GoogleDrive URL"
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
                    onChange={dataChange}
                    placeholder="Enter Your Email"
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
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
                <Form.Group as={Col} controlId="investortype">
                  <Form.Label>Investor Type</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="text"
                    name="investortype"
                    value={inputField.investortype}
                    onChange={dataChange}
                    placeholder="Enter Your Investor Type"
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="investrange">
                  <Form.Label>INVESTMENT RANGE </Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="text"
                    name="investrange"
                    value={inputField.investrange}
                    onChange={dataChange}
                    placeholder="Enter Your INVESTMENT RANGE"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="location">
                  <Form.Label>LOCATION </Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="text"
                    name="location"
                    value={inputField.location}
                    onChange={dataChange}
                    placeholder="Enter Your LOCATION"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="website">
                  <Form.Label>Website</Form.Label>
                  <Form.Control
                   // required
                    autoComplete="off"
                    type="text"
                    name="website"
                    value={inputField.website}
                    onChange={dataChange}
                    placeholder="Enter Your Official Website/Company"
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="aboutMe">
                  <Form.Label>ABOUT ME</Form.Label>
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
