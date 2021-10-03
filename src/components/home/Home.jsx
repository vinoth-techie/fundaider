import React, { Component } from "react";
import "./home.css";
import about from "./about.jpg";
class Home extends Component {
  render() {
    return (
      <div className="container">

        <div className="row mt-4">
          <div className="col-12 col-md-6 mt-4">
            <h1 className="heading">Fundaider</h1>
            <p>
              {" "}
              Financial assistance to startups for proof of concept, prototype
              development, product trials, market entry, and commercialization
            </p>
          </div>
          <div className="image col-12 col-md-6">
            <img alt="IMAG" src={about} width="100%" height="300px" />
          </div>
        </div>

        {/* <div className="row mt-4">
          <div className="col-12 col-md-6 mt-4">
            <h1 className="heading">Startup India Seed Fund Scheme</h1>
            Financial assistance to startups for proof of concept, prototype development, product trials, market entry, and commercialization
          </div>
          <div className="image col-12 col-md-6">
            <img alt="imag" src="./about.jpg" width="500px" height="500px" />
          </div> */}

        <div  className="row mt-4">
          <h3 className="heading">Objectives of Fundaider</h3>
          <div className="row">
            <div className="col-sm-4">
              <img
                src="https://seedfund.startupindia.gov.in/static/media/objectives-lady.bf23634a.svg"
                className="img-fluid about-left-img"
                alt="SISFS Logo"
              />
            </div>
            <div className="col-sm-8 about-right-img">
              <p className="para-orange">
                The Indian startup ecosystem suffers from capital inadequacy in
                the seed and ‘Proof of Concept’ development stage.{" "}
              </p>
              <p className="para-orange">
                The capital required at this stage often presents a make or
                break situation for startups with good business ideas.
              </p>
            </div>
          </div>
          <p className="para-text">
            Many innovative business ideas fail to take off due to the absence
            of this critical capital required at an early stage for proof of
            concept, prototype development, product trials, market entry and
            commercialization.{" "}
          </p>
          <p className="para-text">
            Fundaider offered to such promising cases can have a multiplier
            effect in validation of business ideas of many startups, leading to
            employment generation.
          </p>
        </div>
      </div>
    );
  }
}

export default Home;
