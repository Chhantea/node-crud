import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import  { Component } from 'react';
// import App from './App';
// import Edit from './components/Edit';
// import Create from './components/Create';
// import Show from './components/Show';


ReactDOM.render(
    <Router>
        <div>
            <Route exact path='/' component={App} />
            <Route path='/edit/:id' component={Edit} />
            <Route path='/create' component={Create} />
            <Route path='/show/:id' component={Show} />
        </div>
    </Router>
    ,document.getElementById('root'));

import { Link } from 'react-router-dom';

class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }
    componentDidMount(){
        axios.get('http://localhost:3000/api/item')
            .then(res =>{
                this.setState({items: res.data});
                console.log(res);
            }).catch(error =>{
            console.log(error);
            alert('Something error occours ');
        })
    }
    render(){
        return(
            <div className='container'>
                <h3>All Item list</h3>
                <div className='body-panel'>
                    <h4><Link to="/create" className='btn btn-success ' ><i className="fa fa-plus" aria-hidden="true"></i>&nbsp;Add Book</Link></h4>
                </div>
                <table className='table table-hover'>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Details</th>
                        <th>Created At</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.items.map(item =>
                        <tr key={item._id}>
                            <td>{item._id}</td>
                            <td>{item.name} </td>
                            <td>{item.details}</td>
                            <td>{item.createdAt}</td>
                            <td>
                                <Link to={`/show/${item._id}`} className='btn btn-outline-info btn-sm'>Details</Link>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        )
    }
}
 // export  default App;

class Create extends React.Component{
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
                        <input type="text" className="form-control" name="name" value={this.state.item.name}
                               onChange={this.onChange} placeholder="Name"/>
                        <span style={{color: "red"}}>{this.state.errors}</span>
                        {console.log(this.state.error)}
                    </div>
                    <div className="form-group">
                        <label htmlFor="details">Details:</label>
                        <textarea type="text" name='details' className="md-textarea form-control" rows="5" value={this.state.item.details} onChange={this.onChange}
                                  placeholder="Enter any details"/>
                    </div>
                    <button type="submit" className="btn btn-default">Create</button>
                </form>
            </div>
        );
    }

}

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
                console.log(this.state.item);
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