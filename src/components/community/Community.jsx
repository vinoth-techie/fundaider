/* eslint-disable no-unused-vars */
import React, { useState,useEffect } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubTitle,
  CardImg,
  Button,
  CardFooter,
} from "reactstrap";
import { Form } from "react-bootstrap";
import GitHubIcon from "@material-ui/icons/GitHub";
import IconButton from "@material-ui/core/IconButton";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import MailIcon from "@material-ui/icons/Mail";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from '@material-ui/icons/Twitter';
import { data } from "../Shared/data";
import axios from 'axios';
import {useHistory} from 'react-router-dom'
function Community(){ 
  const [state,setState] = useState({
    community:[],
    result:[],
    search:''
  });
  const history = useHistory();
 useEffect(()=>{
    axios.get("http://localhost:3001/getuser")
    .then((res)=>addCommunity(res.data))
    .catch((err)=>console.log(err))
    console.log("sdfsd",state.community);
  },[])
 const addCommunity = (data) =>{
    setState({
      community:data,
      result:data,
    })
    console.log("dfsadf",state.community)
  }
  const handleCategory = (card) => { 
    history.push({
      pathname: `/community/details`,
      state: { data: card },
    });
  };
  const handleClick = (link) => {
    history.push(link);
  }; 
    const cards = state.community&&state.community.map((card) => {
      if(card.role==="student"){return (
        <div className="col-6 col-md-3 mb-3" key={card.id}>
          <Card
            style={{
              boxShadow:
                "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px",
              backgroundColor: "#f1f1f1",
            }}
          >
            <CardBody onClick={() => handleCategory(card)}>
              <CardImg
                src={card.imageUrl}
                className="circular--square "
                height="140"
                width="50"
              ></CardImg>
              <CardTitle className="text-center">{card.name}</CardTitle>
              <h5 className="text-center">{card.designation}</h5>
            </CardBody>
            <CardFooter style={{}} className="row-3  ">
              <a href={card.githublink} target="_blank" rel="noreferrer">
              <IconButton color="inherit">
                  
                  <GitHubIcon />
                </IconButton>{console.log(card,"vinoth kumar")}
              </a>
              <a href={card.linkedin} target="_blank" rel="noreferrer">
                <IconButton color="inherit">
                  <LinkedInIcon />
                </IconButton>
              </a>
              <a href={card.email} target="_blank" rel="noreferrer">
                <IconButton color="inherit">
                  <MailIcon />
                </IconButton>
              </a>
              {/* <a href={card.maillink} target="_blank" rel="noreferrer">
                <IconButton color="inherit">
                  <FacebookIcon />
                </IconButton>
              </a> */}
              <a href={card.twitter} target="_blank" rel="noreferrer">
                <IconButton color="inherit">
                 <TwitterIcon/>
                </IconButton>
              </a>
            </CardFooter>
          </Card>
        </div>
      );}
    });

    const handleSearch = (e) =>{
      e.preventDefault();
      setState({
        ...state,
        [e.target.name]:e.target.value,
        community:state.result.filter(o =>{
          return Object.keys(o).some(k => o[k].toString().toLowerCase().includes(e.target.value.toString().toLowerCase()))
        })
      });
      console.log("sdfsa",state.search);
    }
    return (
      <div className="container">
        
        <div className="row">
        <Form>
          <Form.Group>
              <Form.Control type="text"
              className="form-control"
              placeholder="Enter the Name/Role"
              value={state.search}
              onChange = {handleSearch}
            />
          </Form.Group>
            
          <Button className="primary">
            Search
          </Button>
        </Form>
          {cards}
          </div>
      </div>
    );
  }

export default Community;
