import React, { Component } from "react";
import axios from "axios";

const initialState = {
    categories: [],
}


class Category extends Component{
    constructor(props) {
        super(props);
        this.state = initialState;
        this.navigateToRooms = this.navigateToRooms.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:8085/category/')
            .then(response => {
                this.setState({ categories: response.data.data });
                console.log(this.state.categories);
            })
    }
    navigateToRooms(e, category_id){
        window.location = `vehicle/${category_id}`;
    }

    render(){
        return (
            <div className={"container mt-4"}>
                <span className="border border-info border-5 p-2" style={{fontSize:"20px"}}><b>Display Categories</b></span>
                <div className="table-responsive mt-5">
                    <table className="table table-success table-striped">
                        <thead>
                        <tr>
                            <th scope="col">Category</th>
                            <th scope="col">Description</th>
                            <th scope="col">View</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.categories.length > 0 && this.state.categories.map((item, index) => (
                            <tr key={index}>
                                <td style={{textAlign:"left"}}>{item.category}{console.log(item.category)}</td>
                                <td style={{textAlign:"left"}}>{item.description}</td>
                                <td><button type="button" className="btn btn-primary" onClick={e => this.navigateToRooms(e,item._id)}>View</button></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>


            </div>
        )
    }
}

export default Category;