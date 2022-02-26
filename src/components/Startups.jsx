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
import LocationOnIcon from '@material-ui/icons/LocationOn';
import StarIcon from '@material-ui/icons/Star';
import axios from 'axios';
import {useHistory} from 'react-router-dom'
function Community(){ 
  const [state,setState] = useState({ 
    result:[], 
  });
  const history = useHistory();
 useEffect(()=>{
    axios.get("http://localhost:3001/getStartups")
    .then((res)=>addCommunity(res.data))
    .catch((err)=>console.log(err))
    //console.log("sdfsd",state.community);
  },[])
 const addCommunity = (data) =>{
   console.log(data);
    setState({ 
      result:data,
    }) 
  }
  // const handleCategory = (card) => { 
  //   history.push({
  //     pathname: `/community/details`,
  //     state: { data: card },
  //   });
  // };
  const handleClick = (link) => {
    history.push(link);
  }; 
    const cards = state.result&&state.result.map((card) => {
      return (
        // <div className="col-6 col-md-3 mb-3" key={card.id}>
          <Card
          key={card._id}
          className="col-md-3 align-items-right"
            style={{
              boxShadow:
                "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px",
              backgroundColor: "#f1f1f1",
            }}
          >
            {/* <CardBody>//onClick={() => handleCategory(card)}> */}
            <CardBody>
              <CardImg
                src={card.img}
                className="circular--square "
                height="150"
                width="80"
              ></CardImg>
              <CardTitle className="text-center">{card.name}</CardTitle>
              <p className="text-center">{card.description}</p>
              <p><LocationOnIcon></LocationOnIcon>{card.location}</p> 
            </CardBody>
            {/* <CardBody>{card.email}</CardBody> */}
          </Card>
        // </div>
      );
    });


    return (
      <div className="container">
      <div className="row">
        
        {/* <div className="row">
        <Form>
          <Form.Group>
              <Form.Control type="text"
              className="form-control"
              placeholder="enter the name"
              value={state.search}
              onChange = {handleSearch}
            />
          </Form.Group>
            
          <Button className="primary">
            search
          </Button>
        </Form>
          {cards}
          </div> */}
          {cards}
      </div>
      </div>
    );
  }

export default Community;
