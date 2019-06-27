import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Edit extends Component{
    constructor(props){
        super(props);
        this.state = {
            item: {"name":"","details":""}
        }
    }
    componentDidMount(){
        axios.get('http://localhost:3000/api/item/' + this.props.match.params.id)
            .then(res => {
                this.setState({item: res.data});
            });
    }
    onChange = (e) => {
        const state = this.state.item;
        state[e.target.name] = e.target.value;
        this.setState({item: state});
    }
    onSubmit = (e) => {
        e.preventDefault();
        const {name , details} = this.state.item;
        axios.put('http://localhost:3000/api/item/' + this.props.match.params.id, {name , details})
            .then(result =>{
                this.props.history.push('/show/' + this.props.match.params.id);
            });
    }
    render(){
        return(
            <div className='jumbotron'>
                <h4><Link to={`/show/${this.state.item._id}`} className='btn btn-outline-info'><span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span>Cancel edit</Link></h4>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text"
                               className="form-control"
                               name="name"
                               value={this.state.item.name}
                               onChange={this.onChange}
                               placeholder="Name"/>
                        <span style={{color: "red"}}>{this.state.errors}</span>
                        {console.log(this.state.error)}
                    </div>
                    <div className="form-group">
                        <label htmlFor="details">Details:</label>
                        <textarea type="text"
                                  name='details'
                                  className="md-textarea form-control"
                                  rows="5"
                                  value={this.state.item.details}
                                  onChange={this.onChange}
                                  placeholder="Enter any details"/>
                    </div>
                    <button type="submit" className="btn btn-default">Create</button>
                </form>
            </div>
        );
    }
    
}

export default Edit;