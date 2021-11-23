/* eslint-disable no-unused-vars */
import React, { useState,useEffect } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubTitle,
  CardImg,
  CardFooter,
} from "reactstrap";
//import GitHubIcon from '@mui/icons-material/GitHub';
import GitHubIcon from "@material-ui/icons/GitHub";
import IconButton from "@material-ui/core/IconButton";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import MailIcon from "@material-ui/icons/Mail";
import { data1 } from "../Shared/data1";
import axios from "axios";
export default function Investors(props) { 
  const handleCategory = (card) => {
    //console.log(card);
    props.history.push({
      pathname: `/investor/details/${card.name}`,
      state: { data: card },
    });
  };
  const [state,setState] = useState({
    investors:[]
  })
  const handleClick = (link) => {
    props.history.push(link);
  }; 
  useEffect(()=>{
    axios.get("http://localhost:3001/getInvestors")
    .then((res)=>addInvestor(res.data))
    .catch((err)=>console.log(err))
    console.log("sdfsd",state.investors);
  },[])
  const addInvestor = (data) =>{
    setState({
      investors:data
    })
    console.log("dfsadf",state.investors)
  }
    const cards = state.investors&&state.investors.map((card) => {
      return (
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
            <CardFooter style={{}} className="row-3  "></CardFooter>
          </Card>
        </div>
      );
    });
    return (
      <div className="container">
        <div className="row">{cards}</div>
      </div>
    );
  } 
