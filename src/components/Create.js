import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Create extends Component{
    constructor(){
        super();
        this.state = {
            name: '',
            details: ''
        };
    }
    onChange = (e) =>{
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }
    onSubmit = (e) =>{
        e.preventDefault();
        const {name,details} = this.state;
        axios.post('http://localhost:3000/api/item',{name,details})
            .then((result) => {
                this.props.history.push('/')
            });
    }
    render(){
        const {name, details} = this.state;
        return(
            <div className='jumbotron'>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" className="form-control" name="name" value={name} onChange={this.onChange}
                           placeholder="Name"/>
                </div>
                <div className="form-group">
                    <label htmlFor="details">Details:</label>
                    <textarea type="text" name='details' className="md-textarea form-control" rows="5" value={details} onChange={this.onChange}
                              placeholder="Enter any details"/>
                </div>
                <button type="submit" className="btn btn-default">Create</button>
            </form>
            </div>
        );
    }
}

export default Create;