import React, { Component } from 'react';
import { Container } from 'reactstrap';
// let id=null;
export default class BoardItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            data: null
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params !== this.props.match.params) {
            let id = this.props.match.params
            console.log(id.id)
            this.setState({ id: id.id })

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
        // let load = data.find((e) => {
        //     return (e[id] === id)
        // })
        // console.log("LOAD : "+load)
    }
    render() {
        return (<div>
            <Container>
                <p>hello eh:   {this.state.id}</p>
                {/* <p>{this.state.id}</p> */}
            </Container>``
        </div>
        );
    }
}