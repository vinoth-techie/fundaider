/* eslint-disable no-unused-vars */
import React, { Component } from "react";
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
class Investors extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleCategory = this.handleCategory.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleCategory = (id, name) => {
    console.log(id);
    this.props.history.push({
      pathname: `/community/${name}`,
      state: { id: id },
    });
  };
  handleClick = (link) => {
    this.props.history.push(link);
  };
  render() {
    const cards = data1.map((card) => {
      return (
        <div className="col-6 col-md-3 mb-3" key={card.id}>
          <Card
            style={{
              boxShadow:
                "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px",
              backgroundColor: "#f1f1f1",
            }}
          >
            <CardBody onClick={() => this.handleCategory(card.id, card.name)}>
              <CardImg
                src={card.img}
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
}

export default Investors;
