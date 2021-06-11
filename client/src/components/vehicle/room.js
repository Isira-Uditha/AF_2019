import React, { Component } from "react";
import AddRoom from "./addRoom/addRoom";
import ViewRoom from "./viewRoom/viewRoom";

const initialState = {
    categoryId:'',
}

class Room extends Component{
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentWillMount() {
        let id = `${this.props.match.params.id}`;
        this.setState({ categoryId: id });
    }

    render(){
        return (
            <div className={"container mt-4"}>
                <span className="border border-info border-5 p-2" style={{fontSize:"20px"}}><b>Rooms</b></span>
                {this.state.categoryId === 'undefined' &&(
                <AddRoom/>
                    )
                }
                <ViewRoom id={this.state.categoryId}/>
            </div>
        )
    }
}

export default Room;