/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Card, CardBody, CardTitle, CardSubTitle, CardImg } from 'reactstrap';
//import GitHubIcon from '@mui/icons-material/GitHub';
import GitHubIcon from '@material-ui/icons/GitHub';
import IconButton from '@material-ui/core/IconButton';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import MailIcon from '@material-ui/icons/Mail';
import { data } from './Shared/data';
class Investors extends Component {
    render() {
        const cards = data.map((card) => {
            return (
                <div className="col-6 col-md-3 mb-3" key={card.id}>
                    <Card style={{ boxShadow: "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px" }}>
                        <CardImg src={card.img} className="circular--square " height="140" width="50"></CardImg>
                        <CardBody>
                            <CardTitle className="text-center">
                                {card.name}
                            </CardTitle>
                           {/* <CardSubTitle>
                                {card.designation}
                            </CardSubTitle> */ }
                            <IconButton color="inherit">
                                <GitHubIcon />
                                <LinkedInIcon />
                                <MailIcon/>
                            </IconButton>
                        </CardBody>
                    </Card>
                </div>
            )
        })
        return (
            <div className="container">
                <div className="row">
                    {
                        cards
                    }

                </div>










            </div>
        );
    }
}


export default Investors;