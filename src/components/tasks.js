import React, { Component } from 'react';
import { Container, Spinner, Table, Col, Button, CardTitle, Modal, Card, ModalFooter, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown, CardGroup, CardColumns, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
export default class Tasks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.username,
            tasks: null,
            toggleAddNewTask: false,
            newTaskName: null,
            toggleShowTask: false,
            tasks2: null
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.tasks !== this.props.tasks) {
            console.log(this.props.tasks)
            this.setState({ tasks: this.props.tasks, username: this.props.username })
            let arti = this.state.tasks;
            arti.map((el, key) => {
                Object.assign(el, { isOpen: false })
            })
            this.setState({ tasks2: arti });
        }
        console.log(this.props.tasks)
        console.log("entered cdu at tasks.js ")

    }
    componentDidMount() {
        console.log(this.props.tasks)
        this.setState({ tasks: this.props.tasks, username: this.props.username })
        let arti = this.state.tasks;
        if (arti)
            arti.map((el, key) => {
                Object.assign(el, { isOpen: false })
            })
        this.setState({ tasks2: arti });
        console.log(arti)
        console.log("entered cdm at tasks.js ")

    }
    handleAddNewTaskToggler = () => {
        this.setState({ toggleAddNewTask: !this.state.toggleAddNewTask })
    }
    showTask = () => {
        this.setState({ toggleShowTask: !this.state.toggleShowTask })

    }
    newTaskNameHandler = (e) => {
        e.preventDefault();
        this.setState({
            newTaskName: e.target.value
        })
    }
    handleSubmitNewTask = () => {
        if (this.state.newTaskName === null || this.state.newTaskName === "") {
            alert("enter Valid stage name");
            return;
        }
        console.log(this.state.tasks)
        // if(this.state.tasks.length)
        if (this.state.tasks.find((el) => el.taskName === this.state.newTaskName)) {
            alert(`Task with the name ${this.state.newTaskName} already exists`);
            return;
        }
        console.log(this.props.username)
        let totalData = JSON.parse(localStorage.getItem(this.state.username));
        let obj = null;
        obj = {
            taskName: this.state.newTaskName,
            // [this.state.newTaskName]: {}
        }
        console.log(totalData);
        let index = totalData.boards.findIndex(el => el.boardName === this.props.boardName);
        // obj2.push(obj);

        console.log(index)
        let boardName = totalData.boards.find(el => el.boardName === this.props.boardName)

        console.log(boardName.boardName)
        let boardNames = boardName.boardName
        // totalData.boards[index][boardNames].push(obj);
        console.log(totalData.boards[index][boardNames])
        console.log(this.props.stageIndex)
        totalData.boards[index][boardNames][this.props.stageIndex][this.props.stageName].push(obj)

        localStorage.setItem(this.state.username, JSON.stringify(totalData));
        this.setState({
            toggleAddNewStage: !this.state.toggleAddNewStage,
            newStageName: null
        })
        this.setState({
            tasks: totalData.boards[index][boardNames][this.props.stageIndex][this.props.stageName],
            toggleAddNewTask: !this.state.toggleAddNewTask,
            newTaskName: null
        })
        let arti = this.state.tasks;
        arti.map((el, key) => {
            Object.assign(el, { isOpen: false })
        })
        this.setState({ tasks2: arti });

    }
    handleNotSubmit = () => {
        this.setState({
            toggleAddNewTask: !this.state.toggleAddNewTask,
            newTaskName: null
        })
    }
    show = (id) => {
        console.log(this.state.tasks)
        this.state.tasks.map((el, key) => {
            console.log("key")
            if (el.taskName === id)
                return (
                    <Modal isOpen={this.state.toggleShowTask} toggle={this.state.toggleShowTask} backdrop="static" >
                        <ModalHeader toggle={this.state.toggleShowTask}>Task Data</ModalHeader>
                        <ModalBody>
                            {key}{el.taskName && key}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.showTask}>Close</Button>{' '}

                        </ModalFooter>
                    </Modal>
                )
        })
    }
    render() {
        return (
            this.state.tasks ? (
                <div>
                    {<div>
                        <Table bordered style={{
                    display: 'flex',
                    overflowY : 'scroll',
                    width: '100%',
                    maxHeight:'150px'
                 }}>
                            <tbody>
                                {
                                    (this.state.tasks) ?
                                        this.state.tasks.map((el, key) => {
                                            return (
                                                <tr>
                                                    <td>
                                                        {/* {el?<a onClick={this.showTask}> <b>{el.taskName}</b></a>:null} */}
                                                        <a onClick={this.showTask}> <b>{el.taskName}</b></a>
                                                        <Modal isOpen={this.state.toggleShowTask} toggle={this.state.toggleShowTask} backdrop="static" >
                                                            <ModalHeader toggle={this.state.toggleShowTask}>Task Data</ModalHeader>
                                                            <ModalBody>
                                                                {el.taskName}
                                                            </ModalBody>
                                                            <ModalFooter>
                                                                <Button color="primary" onClick={this.showTask}>Close</Button>{' '}
                                                            </ModalFooter>
                                                        </Modal>
                                                        {/* {el?<a onClick={this.showTask}>{el.taskName}</a>:null} */}
                                                        {/* {this.state.toggleShowTask?(this.show(el.taskName)):null} */}
                                                        {/* <Link to=""onClick={this.showTask}>{el.taskName}</Link> */}
                                                        {
                                                            el.isOpen ?
                                                                <Modal isOpen={this.state.toggleShowTask} toggle={this.state.toggleShowTask} backdrop="static" >
                                                                    <ModalHeader toggle={this.state.toggleShowTask}>Task Data</ModalHeader>
                                                                    <ModalBody>
                                                                        {el.taskName}
                                                                    </ModalBody>
                                                                    <ModalFooter>
                                                                        <Button color="primary" onClick={this.showTask}>Close</Button>{' '}

                                                                    </ModalFooter>
                                                                </Modal>
                                                                :
                                                                null
                                                        }
                                                    </td>
                                                </tr>
                                            )
                                        })
                                        : null
                                }
                            </tbody>
                        </Table>
                        <Button outline color="info" onClick={this.handleAddNewTaskToggler}> Add new Task</Button>
                        <Modal isOpen={this.state.toggleAddNewTask} toggle={this.state.toggleAddNewTask} backdrop="static" >

                            <ModalHeader toggle={this.state.toggleAddNewTask}>Add A NEW TASK</ModalHeader>
                            <ModalBody>
                                <Form>
                                    <FormGroup>
                                        {/* <Col> */}
                                        <Label for="newTask">TaskName</Label>
                                        {/* </Col> */}
                                        {/* <Col> */}
                                        <Input type="text" id="newTask" onChange={this.newTaskNameHandler} placeholder="enter new task name"></Input>
                                        {/* </Col> */}
                                    </FormGroup>
                                </Form>
                            </ModalBody>
                            <ModalFooter>
                                <Button outline color="primary" onClick={this.handleSubmitNewTask}>Add Task</Button>{' '}
                                <Button outline color="secondary" onClick={this.handleNotSubmit}>Cancel</Button>
                            </ModalFooter>
                        </Modal>

                    </div>
                    }
                </div>
            )
                :
                null
        )
    }
}