import React, {Component} from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
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
export  default App;