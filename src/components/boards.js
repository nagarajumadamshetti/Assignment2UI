import React, { Component } from 'react';
import { Form, Button, Label, Input, Container, ButtonToggle } from 'reactstrap';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Stages from './stages';
export default class Boards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.username,
            password: this.props.password,
            boardName: null,
            boardData: null,
            displayBoards: true
        }
    }
    handleNewBoard = (e) => {
        e.preventDefault();
        if (e.target.value === "" || e.target.value === null) {
            alert("enter a correct name");
            return;
        }
        this.setState({ boardName: e.target.value });
    }

    componentDidMount() {
        let boardData = JSON.parse(localStorage.getItem(this.props.username));
        this.setState({ boardData: boardData.boards });
    }
    handleSubmit = () => {
        if (this.state.boardName === null || this.state.boardName === "") {
            alert("enter valid board name ");
            return;
        }
        let obj = {
            username: this.state.username,
            password: this.state.password,
            boards: [
                ...this.state.boardData,
                {
                    boardName: this.state.boardName,
                    [this.state.boardName]: [
                        {
                            stageName: "new",
                            "new": []
                        },
                        {
                            stageName: "done",
                            "done": []
                        },
                    ]
                }
                ,
            ]
        }
        this.setState({ boardData: obj.boards })
        localStorage.setItem(this.state.username, JSON.stringify(obj))
    }
    showBoards = () => {
        this.setState({ displayBoards: !this.state.displayBoards });
        console.log("called showBoards")
        let boardData = JSON.parse(localStorage.getItem(this.props.username));
        this.setState({ boardData: boardData.boards });
    }
    render() {
        return (
            <div>
                <Router>
                    {
                        this.state.displayBoards ? (
                            <Container>
                                <Form>
                                    <Label >Name</Label>
                                    <Input type="text" onChange={this.handleNewBoard}></Input>
                                    <ButtonToggle color="primary" onClick={this.handleSubmit}>add board</ButtonToggle>
                                </Form>
                                {
                                    this.state.boardData ? (
                                        // console.log(this.state.boardData)
                                        (this.state.boardData).map((el) => {
                                            console.log(el)

                                            return (
                                                <div>

                                                    <Link onClick={this.showBoards} to={{
                                                        pathname: `/boards/${el.boardName}`,
                                                        state: {
                                                            data: el[el.boardName],
                                                        },
                                                        data: {
                                                            data: this.state.username
                                                        },
                                                    }} >
                                                        {el.boardName}
                                                    </Link>

                                                    <br></br>
                                                </div>
                                            )
                                        })
                                    ) : null
                                }
                            </Container>

                        )
                            :
                            (
                                <div>
                                    <Button color="primary" onClick={this.showBoards}>GoBack</Button>

                                    <Route path="/boards/:id" exact component={Stages} />

                                </div>
                            )
                    }
                </Router>
            </div>

        );
    }
}