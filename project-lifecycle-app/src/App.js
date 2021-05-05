import React from 'react'
import './App.css';
import axios from 'axios'

class App extends React.Component{
  state = {
    gitUsers: [],
    search: '',
    followers: []
  }

  componentDidMount() {
    Promise.all([
      axios.get('https://api.github.com/users/Humza23'),
      axios.get('https://api.github.com/users/Humza23/followers')
    ]).then(responses => {
      console.log(responses[0].data.name);
      console.log(responses[1].data.map(item => (
        item.login
      )));
        this.setState({
            gitUsers: 
              responses[0].data.name
            ,
            followers: [
              responses[1].data.map(item => (
                item.login
              ))
            ]
        })
    })
    .catch(err=>{
        console.log(err);
    })
}


  changeHandler = (e) => {
    this.setState({
      search: e.target.value
    });
  }

  submitHandler = (e) => {
    e.preventDefault()
    Promise.all([
      axios.get(`https://api.github.com/users/${this.state.search}`),
      axios.get(`https://api.github.com/users/${this.state.search}/followers`)
    ]).then(responses => {
      // console.log('User:', res.data);
      this.setState({
        gitUsers: responses[0].data.name,
        followers: [
          responses[1].data.map(item => (
            <h3>{item.login}</h3>
          ))
        ]
      })
    })
    .catch(err=>{
      console.log(err);
    })
  }

  render(){
    console.log('App Rendered DOM');
    return(
      <div className="App">
      <h1> Github User Data v1.0 </h1>
      <form onSubmit={this.submitHandler}>
        <input onChange={this.changeHandler} placeholder="enter username" type="text" value={this.state.search}/>
        <button> Search User! </button>
      </form>

      <div id="userContainer">
        <h1>
          {this.state.gitUsers}
        </h1>
        <h3>
        Followers: {this.state.followers}
        </h3>
      </div>

      </div>
    )
  }
}


export default App;
