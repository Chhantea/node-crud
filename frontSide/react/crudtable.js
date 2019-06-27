import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

// main item application
class ItemApplication extends  React.Component{
    constructor(props){
            super(props);
            item.state =  {
                items: []
            };
        }
    componentDidMount() {
        this.getDataFromApi();
    };
    getDataFromApi (){
        var self = this;
        axios.get('http://localhost:3000/api/item')
            .then(function (response){
                self.setState({items: response.data});
            })
            .catch(function (error){
                console.log(error);
            });
    };
    handleAdd (item){
        var items = this.state.items;
        // var index = items.indexOf(e);
        items.push(item);
        this.setState({items: items});
    };
    handleDeleteRecord = (item) => {
        var items = this.state.items.splice();
        var index = items.indexOf(item);
        items.splice(index, 1);
        this.setState({items: items});

    };
    handleUpdateRecord = (old_item, item) => {
        var items = this.state.items.slice();
        var index = events.indexOf(old_item);
        items.splice(index,1,old_item);
        this.setState({items: items});
    };
    render () {
        return(
          <div>
              <ItemTable items={this.state.items}
                         handleDeleteRecord={this.handleDeleteRecord}
                         handleUpdateRecord={this.handleUpdateRecord} />
          </div>
        );
    }
}

ReactDOM.render(<ItemApplication/>,document.getElementById('root'));

// Items table class
class ItemTable extends React.Component{
    handleDeleteRecord (item){
         this.props.handleDeleteRecord(item);
    };
    handleUpdateRecord (old_item,item){
        this.props.handleUpdateRecord(old_item,item);
    };
    render() {
        var items= [];
        this.props.items.forEach(function (item){
            items.push(<Item  item = {item}
                              key = {'item' + item.id}
                              handleDeleteRecord = {this.handleDeleteRecord}
                              handleUpdateRecord = {this.handleUpdateRecord}
            />);
        }.bind(this));
        return(
            <table className='table table-striped'>
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
                {items}
                </tbody>
            </table>
        );
    }

}

// now for item component

class Item extends React.Component{
    // constructor(props){
    //     super(props);
    //     return {edit: false};
    // };
    propTypes = {
        name: React.PropTypes.string,
        details: React.PropTypes.string
    };
    handleToggle(e) {
        e.preventDefault();
        this.setState({edit: !this.state.edit});
    };
    recordValue(field){
        ReactDOM.findDOMNode(this.refs[field]).value;
    };
    handleDelete(e){
        e.preventDefault();
        if(confirm('This is Delete Alert')){
         axios.delete('http://localhost/3000/api/items/' + this.props.item._id)
             .then(function (res){
                 this.props.handleDeleteRecord(this.props.item);
             }.bind(this))
             .catch(function (error){
                 console.log(error);
                 alert('Cannot delete Requested record:', error);
             });
        }
    };
    handleUpdate(e){
      e.preventDefault();
      if (this.validRecord()){
          var item_data = {
              name: this.recordValue("name"),
              details: this.recordValue("details")

          };
          axios.put('http://localhost:3000/api/items/' + this.props.item._id)
              .then(function (data){
                  this.props.handleUpdateRecord(this.props.item, data);
                  this.setState({ edit: false});
              }.bind(this))
              .catch(function (error){
                  alert('Cannot update requested Record:', error);
              });
        }else{
          alert('please fill all fields.');
       }
    };
    validRecord(){
      if (this.readValue("name") && this.readValue("details")){
          return true;
      }else{
          return false;
      }
    };
    renderForm(){
        return(
            <tr>
             <td>
                 <input name="name"
                        defaultValue={this.props.item.name}
                        className="form-control"
                        type="text"
                        ref="name"
                 />
             </td>
                <td>
                    <input  name="details"
                            defaultValue={this.props.item.details}
                            className="form-control"
                            type="text"
                            ref="details"
                    />
                </td>
                <td>
                    <a className="btn btn-success btn-sm"
                       onClick={this.handleUpdate}>
                        Save
                    </a>
                    <a className="btn btn-default btn-sm"
                       onClick={this.handleToggle} >
                        Cancel
                    </a>
                </td>
            </tr>
        );
    };
    renderRecord() {
       var item = this.props.item;
       return(
           <tr>
               <td>{item._id}</td>
               <td>{item.name}</td>
               <td>{item.details}</td>
               <td>{item.createdAt}</td>
               <td>
                   <button className="btn btn-danger btn-sm" onClick= {this.handleDelete}>
                       Delete
                   </button>
                   <button className="btn btn-primary btn-sm" onClick={this.handleToggle}>Edit</button>
               </td>
           </tr>
       );
    };
    render(){
        if (this.state.edit) {
            return(this.renderForm());
        } else {
            return(this.renderRecord());
        }
    };
}

//