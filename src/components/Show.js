import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Show extends Component{
    constructor(props){
        super(props);
        this.state = {
            item: ''
        };
    }
    componentDidMount(){
        console.log(this.props.match.params.id);
        axios.get('http://localhost:3000/api/item/' + this.props.match.params.id)
            .then(res =>{
                this.setState({item: res.data});
            }).catch(error =>{
                console.log(error);
                alert('This item not found');
        });
    }
    delete(id){
        console.log(id);
        axios.delete('http://localhost:3000/api/item/' + id)
        .then(res =>{
            alert('Item delete Successfully');
            this.props.history.push('/')
        }).catch(error =>{
            alert('cannot delete');
        });
    }
    render(){
        return(
          <div className='jumbotron'>
              <div className="panel panel-default">
                  <div className="panel-heading">
                      <h3 className="panel-title">
                          {this.state.item.name}
                      </h3>
                  </div>
                  <div className="panel-body">
                      <h4><Link to="/" className='btn btn-outline-info'><i className='fa fa-arrow-left'  aria-hidden='true'></i> Back to Item
                          List</Link></h4>
                      <dl>
                          <dt>ID:</dt>
                          <dd>{this.state.item._id}</dd>
                          <dt>Name:</dt>
                          <dd>{this.state.item.name}</dd>
                          <dt>Details:</dt>
                          <dd>{this.state.item.details}</dd>
                          <dt>Created Date:</dt>
                          <dd>{this.state.item.createdAt}</dd>
                      </dl>
                      <Link to={`/edit/${this.state.item._id}`} className="btn btn-success btn-sm">Edit</Link>&nbsp;
                      <button onClick={this.delete.bind(this, this.state.item._id)} className="btn btn-danger btn-sm">Delete
                      </button>
                  </div>
              </div>
          </div>
        );
    }
}

export default Show;