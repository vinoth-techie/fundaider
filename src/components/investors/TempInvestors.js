import React,{useState,useEffect} from 'react'
import { Card, CardBody, CardTitle,CardImg,CardFooter } from "reactstrap";
import GitHubIcon from "@material-ui/icons/GitHub";
import IconButton from "@material-ui/core/IconButton";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import MailIcon from "@material-ui/icons/Mail";
import {useHistory,useLocation} from 'react-router-dom'
import { data } from "../Shared/data";
function TempInvestors() {
    const history = useHistory();
    const location = useLocation();
    const [state,setState] = useState({
        investor:[]
    });
    useEffect(()=>{
        
       //console.log("sdfsd",location.state.data.name)
       setState({
           investor:location.state.data
       })
       console.log("sdfsd",location.state.data.name)
    },[]) 
    return (
        <div>
            <div className="col-6 col-md-3 mb-3" key={location.state.data._id}>
            <Card
              style={{
                boxShadow:
                  "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px",
              }}
            >
              <CardImg
                src={location.state.data.imageUrl}
                className="circular--square "
                height="140"
                width="50"
              ></CardImg>
              <CardBody>
                <CardTitle className="text-center">{location.state.data.name}</CardTitle>
                {/* <CardSubTitle>
                                {card.designation}
                            </CardSubTitle> */}
                <a href="#" target="_blank" rel="noreferrer">
                  <IconButton
                    color="inherit"
                  >
                    <GitHubIcon />
                  </IconButton>
                </a>
                <a href="#" target="_blank" rel="noreferrer">
                  <IconButton color="inherit">
                    <LinkedInIcon />
                  </IconButton>
                </a>
                <a href="#" target="_blank" rel="noreferrer">
                  <IconButton color="inherit">
                    <MailIcon />
                  </IconButton>
                </a>
              </CardBody>
            </Card>
          </div>
        </div>
    )
}

export default TempInvestors;
