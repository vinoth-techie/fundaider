import React, { Component } from 'react';
import { Card, Form, Button, Row, Col, InputGroup } from 'react-bootstrap';

export default class addUserForm extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.addUser = this.addUser.bind(this);
        this.dataChange = this.dataChange.bind(this);
    }

    initialState = {
        name: '', imageUrl: '', email: '', college: '', phone: '', githublink: '',
        edit: false
    }

    resetForm = () => {
        this.setState(() => this.initialState);
    }

    addUser = (event) => {

        event.preventDefault();
        const user = {
            name: this.state.name,
            imageUrl: this.state.imageUrl,
            email: this.state.email,
            college: this.state.college,

            githublink: this.state.githublink,

        };
        console.log(user);
    }

    dataChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });

    }
    render() {


        const { name, imageUrl, email, college, githublink, projectdetails, projectgitlink } = this.state;

        const handleEdit = () => {
            this.setState({
                ...this.state,
                edit: !this.state.edit
            })};

            return (
                <div className="container">
                    <Card className="border ">
                        <Card.Header>Profile Setting</Card.Header>
                        <Form onReset={this.resetForm} onSubmit={this.addUser} id="addUserForm">
                            <Card.Body>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="name">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control required autoComplete="off"
                                            type="text" name="name"
                                            value={name}
                                            onChange={this.dataChange}
                                            placeholder="Enter Name"


                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="image">
                                        <Form.Label>Image Url</Form.Label>
                                        <Form.Control autoComplete="off"
                                            type="file" name="imageUrl"
                                            value={imageUrl}
                                            onChange={this.dataChange}
                                            placeholder="Enter URL"
                                        />

                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="email">
                                        <Form.Label>Emailid</Form.Label>
                                        <Form.Control required autoComplete="off"
                                            type="text" name="email"
                                            value={email}
                                            onChange={this.dataChange}
                                            placeholder="Enter mail"


                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="college">
                                        <Form.Label>College</Form.Label>
                                        <Form.Control required autoComplete="off"
                                            type="text" name="college"
                                            value={college}
                                            onChange={this.dataChange}
                                            placeholder="Enter College Name"
                                        />

                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="githublink">
                                        <Form.Label>GithubLink</Form.Label>
                                        <Form.Control required autoComplete="off"
                                            type="text" name="githublink"
                                            value={githublink}
                                            onChange={this.dataChange}
                                            placeholder="Enter Your Githublink"


                                        />
                                    </Form.Group>

                                </Row>
                            </Card.Body>
                            <Card.Footer style={{ "textAlign": "right" }}>
                                <Button size="md" type="submit" variant="success">
                                    Submit
                                </Button>{' '}
                                <Button size="md" type="reset" variant="info">
                                    Reset
                                </Button>
                            </Card.Footer>
                        </Form>
                    </Card>

                    <h3 >Projects</h3>
                    <Button onClick={handleEdit}>Upload</Button>
                    <Card className={this.state.edit ? "border" : "d-none border"}>
                        <Card.Header>Profile Setting</Card.Header>
                        <Form onReset={this.resetForm} onSubmit={this.addUser} id="addUserForm">
                            <Card.Body>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="name">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control required autoComplete="off"
                                            type="text" name="name"
                                            value={name}
                                            onChange={this.dataChange}
                                            placeholder="Enter Name"


                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="image">
                                        <Form.Label>Image Url</Form.Label>
                                        <Form.Control autoComplete="off"
                                            type="file" name="imageUrl"
                                            value={imageUrl}
                                            onChange={this.dataChange}
                                            placeholder="Enter URL"
                                        />

                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="email">
                                        <Form.Label>Emailid</Form.Label>
                                        <Form.Control required autoComplete="off"
                                            type="text" name="email"
                                            value={email}
                                            onChange={this.dataChange}
                                            placeholder="Enter mail"


                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="college">
                                        <Form.Label>Project Details</Form.Label>
                                        <Form.Control required autoComplete="off"
                                            type="text" name="college"
                                            value={projectdetails}
                                            onChange={this.dataChange}
                                            placeholder="Enter Project Details"
                                        />

                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="githublink">
                                        <Form.Label>GithubLink</Form.Label>
                                        <Form.Control required autoComplete="off"
                                            type="text" name="projectgitlink"
                                            value={projectgitlink}
                                            onChange={this.dataChange}
                                            placeholder="Enter Your Githublink"


                                        />
                                    </Form.Group>

                                </Row>
                            </Card.Body>
                            <Card.Footer style={{ "textAlign": "right" }}>
                                <Button size="md" type="submit" variant="success">
                                    Submit
                                </Button>{' '}
                                <Button size="md" type="reset" variant="info">
                                    Reset
                                </Button>
                            </Card.Footer>
                        </Form>
                    </Card>

                </div>
            )
        }
    }
