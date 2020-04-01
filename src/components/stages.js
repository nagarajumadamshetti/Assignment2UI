import React, { Component } from 'react';
import { Container, Spinner, Table, Col, Button, CardTitle, Modal, Card, ModalFooter, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown, CardGroup, CardColumns } from 'reactstrap';
import Tasks from './tasks';
import 'antd/dist/antd.css';
// import { Row, Col, Slider } from 'antd';
// let id=null;
export default class stages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.username,
            id: null,
            stages: null,
            newStageName: null,
            toggleAddNewStage: false,
            droptoggle: false,
            isDropOpen: false,
            position: 0,
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params !== this.props.match.params) {
            let id = this.props.match.params
            console.log(id.id)
            this.setState({ id: id.id });
            const { data } = this.props.location.state;
            console.log(data)
            this.setState({ stages: data })
            // let arti = data;
            // arti.map((el, key) => {

            //     Object.assign(el, { isOpen: false, toggle: false })
            // })
            // this.setState({ stages: arti });
            // console.log(arti)

            console.log(this.state.stages)
            let username = this.props.location.data;
            console.log(username);
            this.setState({ username: username.data })
        }
    }
    componentDidMount() {
        console.log("id is: ");
        this.setState({ id: this.props.match.params })
        // console.log(id)
        let id = this.props.match.params
        console.log(id.id)
        this.setState({ id: id.id })
        const { data } = this.props.location.state;
        console.log(data)
        this.setState({ stages: data })
        // let arti = data;
        // arti.map((el, key) => {

        //     Object.assign(el, { isOpen: false, toggle: false })
        // })
        // this.setState({ stages: arti });
        // console.log(arti)

        let username = this.props.location.data;
        console.log(username.data);
        this.setState({ username: username.data })

        // let load = data.find((e) => {
        //     return (e[id] === id)
        // })
        // console.log("LOAD : "+load)
    }
    handleAddNewStageToggler = () => {
        this.setState({ toggleAddNewStage: !this.state.toggleAddNewStage })
    }
    newStageNameHandler = (e) => {
        e.preventDefault();
        this.setState({ newStageName: e.target.value });
    }
    handleSubmitNewStage = () => {
        if (this.state.newStageName === null || this.state.newStageName === "") {
            alert("enter Valid stage name");
            return;
        }
        if (this.state.stages.find((el) => el.stageName === this.state.newStageName)) {
            alert(`stage with the name ${this.state.newStageName} already exists`);
            return;
        }
        let totalData = JSON.parse(localStorage.getItem(this.state.username));
        let obj = null;
        obj = {
            stageName: this.state.newStageName,
            [this.state.newStageName]: []
        }
        let index = totalData.boards.findIndex(el => el.boardName === this.state.id);
        // obj2.push(obj);
        console.log(index)
        let boardName = totalData.boards.find(el => el.boardName === this.state.id)
        console.log(boardName.boardName)
        let boardNames = boardName.boardName
        totalData.boards[index][boardNames].push(obj);
        localStorage.setItem(this.state.username, JSON.stringify(totalData));
        this.setState({
            toggleAddNewStage: !this.state.toggleAddNewStage,
            newStageName: null
        })
        this.setState({ stages: totalData.boards[index][boardNames] })
    }

    handleNotSubmit = () => {
        this.setState({
            toggleAddNewStage: !this.state.toggleAddNewStage,
            newStageName: null
        })

    }
    handleDropDowns = (id) => {
        let arti = this.state.stages;
        arti.map((el, key) => {
            if (el.stageName === id) {
                el.isOpen = !el.isOpen;
                el.toggle = !el.toggle;
            }

        })
        // this.setState({ stages: arti })
    }
    handleStagePositionChange = (e) => {
        // e.preventDefault();
        // this.setState({ position: this.state.position })
        this.setState({ position: e.target.value })
        console.log("old is : " + e.target.id)
        console.log("new is : " + e.target.value)

        console.log("the position is " + this.state.position);
        let new_index = e.target.value;
        let old_index = e.target.id
        let arr = this.state.stages
        while (old_index < 0) {
            old_index += arr.length;
        }
        while (new_index < 0) {
            new_index += arr.length;
        }
        if (new_index >= arr.length) {
            let k = new_index - arr.length;
            while ((k--) + 1) {
                arr.push(undefined);
            }
        }
        arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
        this.setState({ stages: arr });
        let totalData = JSON.parse(localStorage.getItem(this.state.username));

        let index = totalData.boards.findIndex(el => el.boardName === this.state.id);
        // obj2.push(obj);
        console.log(index)
        let boardName = totalData.boards.find(el => el.boardName === this.state.id)
        console.log(boardName.boardName)
        let boardNames = boardName.boardName
        totalData.boards[index][boardNames] = this.state.stages
        localStorage.setItem(this.state.username, JSON.stringify(totalData));
    }
    render() {
        return (
            <div>
                <br></br>
                <Container>
                    <CardColumns>
                        {
                            this.state.stages ? (
                                this.state.stages.map((el, key) => {
                                    return (
                                        <Card>
                                            {/* <Table>
                                    <thead>
                                        <tr>
                                            <th> */}
                                            {/* {el.stageName} */}
                                            <CardTitle>{el.stageName}{"  position : " + (key + 1)}</CardTitle>

                                            {/* </th>
                                        </tr>
                                    </thead> */}
                                            {/* <Tasks tasks={el}></Tasks> */}
                                            {/* </Table> */}
                                            <UncontrolledDropdown>
                                                <DropdownToggle caret>
                                                    Change position
                                    </DropdownToggle>
                                                <DropdownMenu
                                                    modifiers={{
                                                        setMaxHeight: {
                                                            enabled: true,
                                                            order: 890,
                                                            fn: (data) => {
                                                                return {
                                                                    ...data,
                                                                    styles: {
                                                                        ...data.styles,
                                                                        overflow: 'auto',
                                                                        maxHeight: '100px',
                                                                    },
                                                                };
                                                            },
                                                        },
                                                    }}
                                                >
                                                    {
                                                        this.state.stages.map((el, key1) => {
                                                            return (<div>
                                                                <DropdownItem onClick={this.handleStagePositionChange} id={key} value={key1}>{key1 + 1}</DropdownItem>

                                                            </div>
                                                            )
                                                        })
                                                    }
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </Card>

                                    )
                                })
                            ) : null
                        }
                    </CardColumns>
                </Container>
                <br></br>
                <Container>
                    <Button color="info" onClick={this.handleAddNewStageToggler}> Add new Stage</Button>
                    <Modal isOpen={this.state.toggleAddNewStage} toggle={this.state.toggleAddNewStage} backdrop="static" >

                    <ModalHeader toggle={this.state.toggleAddNewStage}>Add A NEW STAGE</ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    {/* <Col> */}
                                    <Label for="newStage">Stage Name</Label>
                                    {/* </Col> */}
                                    {/* <Col> */}
                                    <Input type="text" id="newStage" onChange={this.newStageNameHandler} placeholder="enter new stage name"></Input>
                                    {/* </Col> */}
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.handleSubmitNewStage}>Add Stage</Button>{' '}
                            <Button color="secondary" onClick={this.handleNotSubmit}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </Container>

                <p>hello eh:   {this.state.id}</p>

            </div>
        );
    }
}