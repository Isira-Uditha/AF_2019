import React, { Component } from "react";
import Select from 'react-select';
import axios from 'axios';

const initialState = {
    code: '',
    amount: '',
    wing: '',
    pax: '',
    options: [],
    categories: [],
}

class AddRoom extends Component{
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onClear = this.onClear.bind(this);
        this.onCategorySelect = this.onCategorySelect.bind(this);
        this.state = initialState;
    }

    componentDidMount() {
        axios.get('http://localhost:8085/category/')
            .then(response => {
                this.setState({ categories: response.data.data }, () => {
                    let data = [];
                    this.state.categories.map((item, index) => {
                        let category = {
                            value: item._id,
                            label: item.category
                        }
                        data.push(category)
                    });
                    this.setState({ options: data });
                })
            })
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    //
    onCategorySelect(e) {
        this.setState({ selectedCategories: e ? e.map(item => item.value) : [] });
    }

    onClear(e) {
        this.setState({
            code: '',
            amount: '',
            wing: '',
            pax: '',
            categories: []
        })
    };

    //
    onSubmit(e) {
        e.preventDefault();
        let room = {
            code: this.state.code,
            amount: this.state.amount,
            wing: this.state.wing,
            pax: this.state.pax,
            categories: this.state.selectedCategories
        };
        console.log('DATA TO SEND', room)
        axios.post('http://localhost:8085/room/create', room)
            .then(response => {
                alert('Room Data successfully inserted')
                this.onClear();
            })
            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })
    }

    render(){
        return (
            <div className="container"><br/>
                <div className={"card p-4"}>
                    <h5 htmlFor="title"  className="form-label mb-4" style={{textAlign:"left"}}>Add Room</h5>
                    <form onSubmit={this.onSubmit}>
                        <div className={"row"}>
                            <div className={"col-md-6"}>
                                <div className="mb-3" style={{textAlign:"left"}}>
                                    <label htmlFor="code"  className="form-label">Code</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="code"
                                        name="code"
                                        value={this.state.code}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="mb-3" style={{textAlign:"left"}}>
                                    <label htmlFor="amount" className="form-label">Amount</label>
                                    <input
                                        type="Number"
                                        className="form-control"
                                        id="amount"
                                        name="amount"
                                        value={this.state.amount}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="mb-3" style={{textAlign:"left"}}>
                                    <label htmlFor="wing" className="form-label">Wing</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="wing"
                                        name="wing"
                                        value={this.state.wing}
                                        onChange={this.onChange}
                                    />
                                </div>
                            </div>
                            <div className={"col-md-6"}>
                                <div className="mb-3" style={{textAlign:"left"}}>
                                    <label htmlFor="pax" className="form-label">Pax</label>
                                    <input
                                        type="Number"
                                        className="form-control"
                                        id="pax"
                                        name="pax"
                                        value={this.state.pax}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="mb-3" style={{textAlign:"left"}}>
                                    <label htmlFor="name" className="form-label">Categories</label>
                                    <Select
                                        options={this.state.options}
                                        onChange={this.onCategorySelect}
                                        className="basic-multi-select"
                                        isMulti
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <div className="row">
                                <div className="col-md-12" style={{textAlign:"right"}}>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default AddRoom;