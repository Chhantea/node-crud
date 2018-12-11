import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

// class App extends React.Component {
//     render() {
//         return <div>I'M READY TO USE THE BACK END APIS! :-) now lets do it <p>this is new to me this way</p> </div>;
//     }
// }
// ReactDOM.render(<App />, document.getElementById('root'));

//
// function tick() {
//     const element = (
//         <div>
//             <h1>Hello, world!</h1>
//             <h2>It is {new Date().toLocaleTimeString()}.</h2>
//         </div>
//     );
//     ReactDOM.render(
//         element,
//         document.getElementById('root')
//     );
// }
//
// setInterval(tick, 2000);
class Clock extends React.Component {
    constructor(props){
        super(props);
        this.state = {date: new Date()};
    }
    componentDidMount() {
    this.timerId = setInterval(
        () => this.tick(),
        1000
    );
    }
    componentWillUnmount(){
        clearInterval(this.timerId);
    }
    tick(){
        this.setState({
            date:new Date()
        });
    }
    render(){
        return(
            <div>
                <h1>This create component class using es6</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }
}
function App() {
    return(
      <div>
          <Clock/>
          {/*<Clock/>*/}
          {/*<Clock/>*/}
          {/*<ActionLink/>*/}
      </div>
    );
}

ReactDOM.render(<App/>, document.getElementById('root'));

// another one click or button function

function ActionLink() {
    function handleClick(e) {
        e.preventDefault();
        console.log('this link got clicked');
    }
    return (
        <a href="#" onClick={handleClick} className='btn btn-amber'>Click Me </a>
    );
}
ReactDOM.render(<ActionLink/>, document.getElementById('click'));

// for toggle button

class Toggle extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {isToggleOn: true};
        // this binding is necessary to make thisworks on call back function
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.setState(state =>({
            isToggleOn:!state.isToggleOn
        }));
    }
    render() {
        return (
            <button onClick={this.handleClick} className='btn btn-sm btn-info'>
                {this.state.isToggleOn ? 'On' : 'Off'}
            </button>
        );
    }
}

ReactDOM.render(<Toggle />, document.getElementById('toggle'));

//not binding

class LoggingButton extends React.Component {
    handleClick() {
        console.log('this is:', this);
    }

    render() {
        // This syntax ensures `this` is bound within handleClick
        return (
            <button onClick={(e) => this.handleClick(e)} className='btn btn-dark'>
                Click me
            </button>
            // <button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
            // <button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>  <---- pass Argument
          );
    }
}
ReactDOM.render(<LoggingButton/>,document.getElementById('log'));

//conditional react statement
function UserGreeting(props) {
    return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
    return <h1>Please sign up.</h1>;
}

function Greeting(props) {
    const  isLoggedIn = props.isLoggedIn;
    if (isLoggedIn){
        return <UserGreeting />;
    }else
    {
        return <GuestGreeting/>;
    }
}

ReactDOM.render(
    // Try changing to isLoggedIn={true}:
    <Greeting isLoggedIn={true} />,
    document.getElementById('condition')
);

//element variable
class ShoppingList extends React.Component {
    render() {
        return (
            <div className="shopping-list">
                <h1>Shopping List for {this.props.name}</h1>
                <ul>
                    <li>Instagram</li>
                    <li>WhatsApp</li>
                    <li>Oculus</li>
                </ul>
            </div>
        );
    }
}

ReactDOM.render(<ShoppingList name={"mark"}/>,document.getElementById('t'));


// 8******************************************************************************************
// basic crud
// main indexing for table start here
class Table extends React.Component{
    constructor(props) {
    super(props);
    this.state = {
             items: []
       }
    }
    componentDidMount(){
        axios.get('/api/item')
            .then(res =>{
                this.setState({items: res.data});
            });
    }
    render() {
        return(
            <div>
                <table className="table">
                    <thead>
                    <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Details</th>
                    <th>Created At</th>
                    <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.items.map(item =>
                        <tr key={item._id}>
                            <td>{item._id}</td>
                            <td>{item.name}</td>
                            <td>{item.details}</td>
                            <td>{item.createdAt}</td>
                            <td><button className='btn btn-sm btn-warning'>Edit</button><Toggle/><button className='btn btn-danger btn-sm'> Delete</button></td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        )
    }

}

ReactDOM.render(<Table/>,document.getElementById('tab'));
// end here

// create class start here
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
        axios.post('/api/item',{name,details})
             .then((result) => {
                 // this.props.history.push("/")
                 // this.setState(self.constructor());
                 console.log(result);
                 this.setState({item: result.data});
             });
    }
    render(){
        const {name, details} = this.state;
        return(
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" className="form-control" name="name" value={name} onChange={this.onChange}
                           placeholder="Name"/>
                </div>
                <div className="form-group">
                    <label htmlFor="details">Details:</label>
                    <textarea type="text"  className="md-textarea form-control" rows="5" value={details} onChange={this.onChange}
                              placeholder="Title"/>
                </div>
                <button type="submit" className="btn btn-default">Create</button>
            </form>
        );
    }
}
ReactDOM.render(<Create/>,document.getElementById('create'));

