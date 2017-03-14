import React, { Component } from 'react';
import axios from 'axios';

// Modules
import Card from './modules/Card';

class App extends Component {
  constructor(){
    super();
    this.state = {
      feed: {
        data: ['Nothing yet!']
      }
    }
  }
  
  componentWillMount(){
    axios.get('http://localhost:8080/getarticles')
    .then((response) => {
      this.setState({
        feed: response
      })
    }) 
    .catch((err) => {
      console.log(err);
    })
  }

  render() {
    return (
        <div className="appRoot">
          <Card articles={this.state.feed}/>
        </div>
    );
  }
  }

export default App;
