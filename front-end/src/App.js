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
      feed: ['Nothing yet!'],
      showPopOut: false,
      articleViewing: 0,
      filterOn: false
    }

    this.shuffleArray = this.shuffleArray.bind(this);
    this.scrollFunction = this.scrollFunction.bind(this);
    this.closePopOut = this.closePopOut.bind(this);
    this.openPopOut = this.openPopOut.bind(this);
    this.slideShowClassToggles = this.slideShowClassToggles.bind(this);
    this.prevArticle = this.prevArticle.bind(this);
    this.nextArticle = this.nextArticle.bind(this);
  }
  
  // Get RSS Feed from Server

  // From https://bost.ocks.org/mike/shuffle/
  shuffleArray(array) {
    var l = array.length, t, i;
    // While there remain elements to shuffle…
    while (l) {
    // Pick a remaining element…
      i = Math.floor(Math.random() * l--);
      // And swap it with the current element.
      t = array[l];
      array[l] = array[i];
      array[i] = t;
    }
    return array;
  }
  

  componentWillMount(){
    axios.get('http://localhost:8080/getarticles')
    .then((response) => {
      let data = this.shuffleArray(response.data)
      this.setState({
        feed: data
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

  /*
  Toggle Slideshow    
    Inspired by: Codrops - https://tympanus.net/Blueprints/GridGallery/
    Licensed under the MIT license - http://www.opensource.org/licenses/mit-license.php
    Copyright 2014, Codrops - http://www.codrops.com
  */

  closePopOut(){
    this.setState({
      showPopOut: false
    })
    this.slideShowClassToggles();
  }

  slideShowClassToggles(){
    let slideshow = document.getElementsByClassName('slideshow')[0]; 
    let card = document.getElementsByClassName('cardRoot--visible')[0].firstChild; 
    // Toggle Slideshow.
    if (slideshow.classList.contains('slideshow-open')){
        slideshow.classList.remove('slideshow-open')
    } else {
      slideshow.classList.add('slideshow-open')
    }
    // Toggle cards.
    if (card.classList.contains('show')){
      card.classList.remove('show');
    } else {
      card.classList.add('show');
    }

  } 

  openPopOut(key){
    let popOutState = this.state.showPopOut;
    if (popOutState){
      this.setState({
        showPopOut: false,
        articleViewing: key
      })
      this.slideShowClassToggles();
    } else {
      this.setState({
        showPopOut: true,
        articleViewing:key
      })
      this.slideShowClassToggles();
    }
  }

  prevArticle(){
    if (this.state.articleViewing > 0){
      this.setState({
        articleViewing: this.state.articleViewing - 1
      })
    }
  }

  nextArticle(){
    if (this.state.articleViewing < this.state.feed.length -1){
      this.setState({
        articleViewing: this.state.articleViewing + 1
      })
    }
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
            openPopOut={this.openPopOut}
            closePopOut={this.closePopOut}
            prevArticle={this.prevArticle}
            nextArticle={this.nextArticle}
            showPopOut={this.state.showPopOut} 
            articleViewing={this.state.articleViewing} 
          />
      </div> 

    );
  }
  }

export default App;
