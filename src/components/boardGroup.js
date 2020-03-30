import React, { Component } from 'react';
import { Form, Button, Label, Input, Container, ButtonToggle } from 'reactstrap';
import { Link } from 'react-router-dom';
import BoardItem from './boardItem';
export default class BoardGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.username,
            password: this.props.password,
            boardName: null,
            boardData: null
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
        this.setState({boardData:boardData.boards})
    }
    handleSubmit = () => {
        
        let obj = {
            username: this.state.username,
            password: this.state.password,
            boards: {
                ...this.state.boardData,
                [this.state.boardName]: {},
            }
        }
        this.setState({ boardData: obj.boards })
        localStorage.setItem(this.state.username, JSON.stringify(obj))
    }

    render() {

        return (
            <Container>
                <Form>
                    <Label >Name</Label>
                    <Input type="text" onChange={this.handleNewBoard}></Input>
                    {/* <Button on={this.handleSubmit} /> */}
                    <ButtonToggle color="primary" onClick={this.handleSubmit}>add board</ButtonToggle>
                    {/* submit</Button> */}
                </Form>
                {
                    this.state.boardData ? (
                        Object.keys(this.state.boardData).map((key) => {
                            // let key=key2
                            return (
                                <div>

                                  <Link to={{
                                        pathname: `/boardGroup/${key}`,
                                        state: {
                                            data: this.state.boardData
                                        },
                                    }}>
                                        {Object.keys(key).length > 0 && key}
                                        {/* Title: {articles.length > 0 && el.title} */}
                                     </Link>  
                                     
                                    <br></br>
                                </div>
                            )
                        })
                    ) : null
                }
            </Container>
        );
    }
}