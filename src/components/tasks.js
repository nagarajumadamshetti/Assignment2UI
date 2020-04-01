import React, { Component } from 'react';
export default class Tasks extends Component{
    constructor(props){
        super(props);
        this.state={
            tasks:null
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.tasks!==this.props.tasks)
        {
            this.setState({tasks:this.props.tasks})
        }
        console.log("entered cdu at tasks.js lie 14")
    }
    componentDidMount() {
        this.setState({tasks:this.props.tasks})
        console.log("entered cdm at tasks.js lie 18")
    }
    render(){
        return(
            this.state.tasks?(
                
                this.state.tasks.map((el,key)=>{
                    return(
                        <tr>
                            
                            {el.title}
                        </tr>
                    )
                })
            ):null
        )
    }
}