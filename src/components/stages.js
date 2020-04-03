import React, { Component } from 'react';
import { Container, Spinner, Table, Row, Col, Button, CardTitle, Modal, Card, ModalFooter, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown, CardGroup, CardColumns, CardBody, CardDeck } from 'reactstrap';
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
            let d = JSON.parse(localStorage.getItem(this.state.username))
            if (d) {
                let index = d.boards.findIndex(el => el.boardName === this.state.id);
                // obj2.push(obj);
                console.log(index)
                let boardName = d.boards.find(el => el.boardName === this.state.id)
                console.log(boardName.boardName)
                let boardNames = boardName.boardName

                this.setState({ stages: d.boards[index][boardNames] })
            }

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
    handleStagePositionChange = async (e) => {
        // e.preventDefault();
        // this.setState({ position: this.state.position })
        this.setState({ position: e.target.value })
        console.log("old is : " + e.target.id)
        console.log("new is : " + e.target.value)

        console.log("the position is " + this.state.position);
        let new_index = e.target.value;
        let old_index = e.target.id
        let d = await JSON.parse(localStorage.getItem(this.state.username))
        if (d) {
            let index = await d.boards.findIndex(el => el.boardName === this.state.id);
            // obj2.push(obj);
            console.log(index)
            let boardName = await d.boards.find(el => el.boardName === this.state.id)
            console.log(boardName.boardName)
            let boardNames = boardName.boardName

            await this.setState({ stages: d.boards[index][boardNames] })
        }
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
        console.log(arr)
        await arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
        // console.log(arr)
        this.setState({ stages: arr });
        let totalData = await JSON.parse(localStorage.getItem(this.state.username));

        let index = await totalData.boards.findIndex(el => el.boardName === this.state.id);
        // obj2.push(obj);
        console.log(index)
        let boardName = await totalData.boards.find(el => el.boardName === this.state.id)
        console.log(boardName.boardName)
        let boardNames = boardName.boardName
        totalData.boards[index][boardNames] = await this.state.stages
        await localStorage.setItem(this.state.username, JSON.stringify(totalData));
        await this.setState({ stages: this.state.stages })
    }

    handleDeleteStage = async (name) => {
        let d = await JSON.parse(localStorage.getItem(this.state.username))
        if (true) {
            let index = await d.boards.findIndex(el => el.boardName === this.state.id);
            // obj2.push(obj);
            console.log(index)
            let boardName = await d.boards.find(el => el.boardName === this.state.id)
            console.log(boardName.boardName)
            let boardNames = boardName.boardName
            await console.log(d.boards[index][boardNames])
            await this.setState({ stages: d.boards[index][boardNames] })
            console.log(this.state.stages)
        }

        console.log(name)
        console.log(this.state.stages)
        let index = this.state.stages.findIndex(el => el.stageName === name)
        if (index === 0) {
            if (this.state.stages.length === 1) {
                alert("only one stage left cannot delete");
                return;
            }
            console.log("lenght : " + this.state.stages.length)
            let stagename0 = this.state.stages[0].stageName;
            console.log(stagename0)
            let stage0Tasks = this.state.stages[0][stagename0]
            let stagename1 = this.state.stages[1].stageName;
            console.log(stagename1)
            console.log(this.state.stages[1][stagename1])
            console.log(stage0Tasks)
            this.state.stages[1][stagename1] = this.state.stages[1][stagename1].concat(stage0Tasks)
            this.state.stages.splice(index, 1);
            console.log(this.state.stages)
            let totalData = JSON.parse(localStorage.getItem(this.state.username));

            let index2 = totalData.boards.findIndex(el => el.boardName === this.state.id);
            // obj2.push(obj);
            console.log(index2)
            let boardName = totalData.boards.find(el => el.boardName === this.state.id)
            console.log(boardName.boardName)
            let boardNames = boardName.boardName
            totalData.boards[index2][boardNames] = this.state.stages
            localStorage.setItem(this.state.username, JSON.stringify(totalData));
            this.setState({ stages: this.state.stages })

        }
        else {
            console.log("lenght : " + this.state.stages.length)
            let stagename0 = this.state.stages[index].stageName;
            console.log(stagename0)
            // let stagename000=stagename0
            let stage0Tasks = this.state.stages[index][stagename0]
            let stagename1 = this.state.stages[index - 1].stageName;
            console.log(stagename1)
            console.log(this.state.stages[index - 1][stagename1])
            console.log(stage0Tasks)
            this.state.stages[index - 1][stagename1] = this.state.stages[index - 1][stagename1].concat(stage0Tasks)
            this.state.stages.splice(index, 1);
            console.log(this.state.stages)
            let totalData = JSON.parse(localStorage.getItem(this.state.username));

            let index2 = totalData.boards.findIndex(el => el.boardName === this.state.id);
            // obj2.push(obj);
            console.log(index2)
            let boardName = totalData.boards.find(el => el.boardName === this.state.id)
            console.log(boardName.boardName)
            let boardNames = boardName.boardName
            totalData.boards[index2][boardNames] = this.state.stages
            localStorage.setItem(this.state.username, JSON.stringify(totalData));
            this.setState({ stages: this.state.stages })
        }
        // this.state.stages.map((el,key)=>{
        //     if(el.stageName===name)
        //     {
        //         // this.state.stages.splice()
        //     }
        // })
        this.setState({ stages: this.state.stages })
    }
    render() {
        return (
            <div>
                {/* <br></br> */}
                <Container
                 style={{
                    border: '2px solid black',
                    display: 'flex',
                    overflowX : 'scroll',
                    width: '100%'
                 }}
                >
                    {/* <CardDeck> */}
                        {/* <CardGroup 
                        style={{
                            overflowY: 'scroll',
                            border:'1px solid red',
                            width:'500px',
                            float: 'right',
                            height:'500px',
                            position:'right'
                        // maxHeight: '200px',
                    }}> */}
                        {/* <Row> */}
                        {
                            this.state.stages ? (
                                this.state.stages.map((el, key) => {
                                    return (
                                        // <Col sm>
                                        <Card body 
                                        style={{
                                            flexShrink: '0',
                                            // outerWidth: '300px',
                                            height: '400px',
                                            borderRadius: '10px',
                                            marginLeft:  '10px',
                                        }}
                                        >
                                            {/* <Table>
                                    <thead>
                                        <tr>
                                            <th> */}
                                            {/* {el.stageName} */}
                                            <CardTitle>{el.stageName}{"  position : " + (key + 1)}</CardTitle>

                                            {
                                            /* </th>
                                        </tr>
                                    </thead> */}
                                            <CardBody >
                                                <Tasks tasks={el[el.stageName]} boardName={this.state.id} username={this.state.username} stageName={el.stageName} stageIndex={key}></Tasks>
                                            </CardBody>

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
                                                                <DropdownItem outline color="success" onClick={this.handleStagePositionChange} id={key} value={key1}>{key1 + 1}</DropdownItem>

                                                            </div>
                                                            )
                                                        })
                                                    }
                                                </DropdownMenu>
                                            </UncontrolledDropdown>

                                            <Button outline color="danger" onClick={() => this.handleDeleteStage(el.stageName)}>Delete Stage</Button>

                                            {'  '}
                                        </Card>
                                        // </Col>
                                    )
                                })
                            ) : null
                        }
                        {/* </Row> */}
                        {/* </CardGroup> */}
                    {/* </CardDeck> */}
                </Container>
                <br></br>
                <Container>
                    <Button outline color="info" onClick={this.handleAddNewStageToggler}> Add new Stage</Button>
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
                            <Button outline color="primary" onClick={this.handleSubmitNewStage}>Add Stage</Button>{' '}
                            <Button outline color="secondary" onClick={this.handleNotSubmit}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </Container>

                <p>hello eh:   {this.state.id}</p>

            </div>
        );
    }
}