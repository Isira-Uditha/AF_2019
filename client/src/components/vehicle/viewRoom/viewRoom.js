import React, { Component } from "react";
import axios from "axios";

const initialState = {
    rooms: [],
    id:'',
    cost:0
}

class ViewRoom extends Component{
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount = async  (e) => {
        await this.setState({id:this.props.id});
        // console.log(this.state.id);
        if(this.state.id === 'undefined'){
            axios.get('http://localhost:8085/room/')
                .then(response => {
                    this.setState({ rooms: response.data.data });
                    console.log(this.state.rooms);
                });
        }else{
            axios.get(`http://localhost:8085/category/${this.state.id}`)
                .then(response => {
                    this.setState({rooms: response.data.data.rooms});
                });

            axios.get(`http://localhost:8085/category/calculate/${this.state.id}`)
                .then(response => {
                    this.setState({cost: response.data.totalCost});
                    console.log(this.state.cost);
                });
        }

    }

    render(){
        return (
            <div className={"container mt-4"}>
                <div className={"card p-4"}>
                    <h5 htmlFor="title"  className="form-label" style={{textAlign:"left"}}>View Room</h5>
                    <div className="table-responsive mt-3">
                        <table className="table table-success table-striped">
                            <thead>
                            <tr>
                                <th scope="col">Code</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Wing</th>
                                <th scope="col">Pax</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.rooms.length > 0 && this.state.rooms.map((item, index) => (
                                <tr key={index}>
                                    <td style={{textAlign:"left"}}>{item.code}</td>
                                    <td style={{textAlign:"left"}}>{item.amount}</td>
                                    <td style={{textAlign:"left"}}>{item.wing}</td>
                                    <td style={{textAlign:"center"}}>{item.pax}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    {this.state.id !== 'undefined' && (
                    <div className={"row"} >
                        <div className={"col-md-1"}>
                            <h6 htmlFor="title"  className="form-label" style={{textAlign:"left"}}>Total Cost</h6>
                        </div>
                        <div className={"col-md-1"}>
                            <h6 style={{textAlign:"right"}}>:</h6>
                        </div>
                        <div className={"col-md-6"}>
                            <h6 htmlFor="title"  className="form-label" style={{textAlign:"left"}}>{this.state.cost}</h6>
                        </div>
                    </div>
                    )}

                </div>
            </div>
        )
    }
}

export default ViewRoom;