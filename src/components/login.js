import React, { Component } from 'react';

import Boards from './boards'
import { Container, ButtonToggle, Col, Row, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            click: false
        }
    }

    handleUserId = (e) => {
        this.setState({
            username: e.target.value
        });
    }

    handlePassword = (e) => {
        this.setState({
            password: e.target.value
        });
    }

    handleClickLogin = async (e) => {

        if (this.state.username === null || this.state.username === "") {
            alert("enter valid user name ");
            return;
        }
        if (this.state.password === null || this.state.password === "") {
            alert("enter valid password ");
            return;
        }
        let items = JSON.parse(localStorage.getItem(this.state.username));
        if (!items) {
            alert("user doesnt exist");
            return;
        }
        else if (items.password !== this.state.password) {
            console.log(items.password)
            alert("password incorrect");
            return;
        }
        this.setState({
            click: !this.state.click
        });
    }
    handleClickLogout = (e) => {
        this.setState({
            username: null,
            password: null,
            click: !this.state.click
        });
    }

    handleClickSignUp = async () => {
        try {
            if (this.state.username === null || this.state.username === "") {
                alert("enter valid user name ");
                return;
            }
            if (this.state.password === null || this.state.password === "") {
                alert("enter valid password ");
                return;
            }
            let items = await JSON.parse(localStorage.getItem(this.state.username));
            if (items) {
                alert("User already exists");
                return;
            }
            const obj = {
                username: this.state.username,
                password: this.state.password,
                boards: []
            }
            localStorage.setItem(this.state.username, JSON.stringify(obj));
            this.setState({ click: !this.state.click });
        }
        catch (error) {
            alert("invalid");
            return;
        }
    }
    componentDidMount() {
        // this.props.history.push('/dashboard/login');
    }
    render() {
        const styles = {
            center: {
                marginLeft: "auto",
                marginRight: "auto"
            }
        }
        return (
            <div className={styles.center}>
                {this.state.click ?
                    (<div>
                        <Button color="danger" onClick={this.handleClickLogout} style={{ position: 'absolute', top: 5, right: 5 }}>Logout</Button>
                        {
                            console.log("the username is : " + this.state.username)
                        }
                        <Boards username={this.state.username} password={this.state.password} />
                    </div>)
                    :
                    (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', alignContent: 'center' }}>
                        <Container >
                            <h2>Sign In</h2>
                            <Form >
                                <Col sm="6" >
                                    <FormGroup>
                                        <Label >USERNAME</Label>
                                        <Input type="text" placeholder="username" onChange={this.handleUserId} id="exampleEmail" />
                                    </FormGroup>
                                </Col>
                                {'  '}
                                <Col sm="6">
                                    <FormGroup>
                                        <Label for="examplePassword" >PASSWORD</Label>
                                        <Input type="password" placeholder="Password" onChange={this.handlePassword} id="examplePassword" />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <Col sm="3">
                                        <FormGroup>
                                            <Button color="success" onClick={this.handleClickLogin}>
                                                Sign in
                                             </Button>
                                            {' '}
                                            <ButtonToggle color='danger' onClick={this.handleClickSignUp}>SignUp</ButtonToggle>
                                        </FormGroup>
                                    </Col>
                                </Col>
                            </Form>
                        </Container>
                    </div>)}
            </div>
        );
    }
}
export default Login;