/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import {
  Card,
  CardBody,
  CardTitle,
  CardSubTitle,
  CardImg,
  CardFooter,
} from "reactstrap";
export default class Project extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-3">
          <Card
            style={{
              boxShadow:
                "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px",
             
            }}
          >
            <CardBody >
              <CardImg
                src="https://api.startupindia.gov.in/sih/api/file/online/course/banner?fileName=cd5d78a9-9792-48e7-bc25-696d104b4024.png"
                
                height="140"
                width="50"
              ></CardImg>
              <CardTitle className="text-center">Implement resource management security in Azure</CardTitle>
              <h5 className="text-center">Vinoth kumar</h5>
            </CardBody>
            
          </Card>
          </div>
        </div>
        
      </div>
    )
  }
}
