import React, { Component } from 'react';
import axios from 'axios';

// CSS
import './App.css'

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

    this.scrollFunction = this.scrollFunction.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
  }
  
  componentWillMount(){
    axios.get('http://localhost:8080/getarticles')
    .then((response) => {
      this.setState({
        feed: response,
        showModal: false
      })
    }) 
    .catch((err) => {
      console.log(err);
    })
  }

  /*
  Scroll Function
    Adapted from CoDrops - https://tympanus.net/codrops/2013/06/06/on-scroll-animated-header/
    Licensed under the MIT license, http://www.opensource.org/licenses/mit-license.php
    Copyright 2013, Codrops, http://www.codrops.com
  */

  scrollFunction() {
    const rootElement = document.documentElement;
    let header = document.querySelector('.header'),
        didScroll = false,
        changeHeaderOn = 250;

    function init(){
      window.addEventListener('scroll', (event) => {
        if(!didScroll) {
          didScroll=true;
          setTimeout(scrollPage, 250);
        }
      })
    }
    
    function scrollPage(){
      function scrollY(){
        return window.pageYOffset || rootElement.scrollTop;
      }
      let sy = scrollY();
      if (sy >= changeHeaderOn){
        header.className = "header header--shrink";
      } else {
        header.className = "header";
      }
      didScroll = false;
    }

    init(); 
  };

  componentDidMount(){
    this.scrollFunction();
  }

  // Toggle Modal

  closeModal(){
    this.setState({
      showModal: false
    })
  }

  openModal(){
    this.setState({
      showModal: true
    })
    return false;
  }

  render() {
    return (
        <div className="appRoot">
          <div className="header">
            <div className="header--inner">
              <h1>Title: TBC</h1>
              <nav>
                <a href="#"><i className="fa fa-refresh" aria-hidden="true"></i></a>
                <a href="#"><i className="fa fa-filter" aria-hidden="true"></i></a>
                <a href="#" id="header__login">Login</a>
              </nav>
            </div>
          </div> 
          <Card 
            articles={this.state.feed} 
            openModal={this.openModal}
            closeModal={this.closeModal} 
            showModal={this.state.showModal}  
          />
      </div> 

    );
  }
  }

export default App;
