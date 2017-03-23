import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group' // ES6
import axios from 'axios';

// CSS
import './App.css'

// Modules
import Card from './modules/Card';
import Loading from './modules/Loading'

class App extends Component {
  constructor() {
    super();
    this.state = {
      feed: [{ 'feed': 'Nothing yet', 'published': new Date() }],
      showPopOut: false,
      articleViewing: 0,
      filterOn: false,
      dropdownShowing: false,
      loading: true
    }

    this.shuffleArray = this.shuffleArray.bind(this);
    this.scrollFunction = this.scrollFunction.bind(this);
    this.closePopOut = this.closePopOut.bind(this);
    this.openPopOut = this.openPopOut.bind(this);
    this.slideShowClassToggles = this.slideShowClassToggles.bind(this);
    this.prevArticle = this.prevArticle.bind(this);
    this.nextArticle = this.nextArticle.bind(this);
    this.refreshFeed = this.refreshFeed.bind(this);
    this.slideshowNavigation = this.slideshowNavigation.bind(this);
    this.eventListener = this.eventListener.bind(this);
    this.toggleDD = this.toggleDD.bind(this);
    this.uniqueFeeds = this.uniqueFeeds.bind(this);
    this.filterArticles = this.filterArticles.bind(this);
    this.dropdownShrunk = this.dropdownShrunk.bind(this);
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

  componentWillMount() {
    axios.get('http://localhost:8080/getarticles')
      .then((response) => {
        // let data = this.shuffleArray(response.data)
        let sortedData = response.data.sort(function (a, b) { return new Date(b.published) - new Date(a.published) })
        this.setState({
          feed: sortedData,
          loading: false
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

    function init() {
      window.addEventListener('scroll', (event) => {
        if (!didScroll) {
          didScroll = true;
          setTimeout(scrollPage, 250);
        }
      })
    }

    function scrollPage() {
      function scrollY() {
        return window.pageYOffset || rootElement.scrollTop;
      }
      let sy = scrollY();
      if (sy >= changeHeaderOn) {
        header.className = "header header--shrink";
      } else {
        header.className = "header";
      }
      didScroll = false;
    }

    init();
  };

  componentDidMount() {
    this.scrollFunction();
  }

  /*
  Toggle Slideshow    
    Inspired by: Codrops - https://tympanus.net/Blueprints/GridGallery/
    Licensed under the MIT license - http://www.opensource.org/licenses/mit-license.php
    Copyright 2014, Codrops - http://www.codrops.com
  */

  slideshowNavigation(keyCode) {
    // if (this.props.showPopOut){
    switch (keyCode) {
      // Left Arrow Key
      case 37:
        this.prevArticle()
        break;
      // Right Arrow Key
      case 39:
        this.nextArticle()
        break;
      // Escape Key
      case 27:
        this.closePopOut();
        break;
      default:
        break;
    }
  }

  closePopOut() {
    this.setState({
      showPopOut: false
    })
    this.slideShowClassToggles();
    document.removeEventListener('keydown', this.eventListener);
  }

  slideShowClassToggles() {
    let slideshow = document.getElementsByClassName('slideshow')[0];
    // Toggle Slideshow.
    if (slideshow.classList.contains('slideshow-open')) {
      slideshow.classList.remove('slideshow-open')
    } else {
      slideshow.classList.add('slideshow-open')
    }
  }

  eventListener(event) {
    let selectedKey = event.keyCode || event.which;
    this.slideshowNavigation(selectedKey);
  }

  openPopOut(key) {
    this.setState({
      showPopOut: true,
      articleViewing: key
    })
    this.slideShowClassToggles();
    document.addEventListener('keydown', this.eventListener);
  }

  prevArticle() {
    if (this.state.articleViewing > 0) {
      this.setState({
        articleViewing: this.state.articleViewing - 1
      })
    }
  }

  nextArticle() {
    if (this.state.articleViewing < this.state.feed.length - 1) {
      this.setState({
        articleViewing: this.state.articleViewing + 1
      })
    }
  }

  // Refresh Feed

  refreshFeed() {
    this.setState({
      loading: true
    })
    axios.get('http://localhost:8080/getarticles')
      .then((response) => {
        let data = this.shuffleArray(response.data);
        let sortedData = data.sort(function (a, b) { return new Date(b.published) - new Date(a.published) });
        this.setState({
          feed: sortedData,
          filterOn: false,
          loading: false
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  // Dropdown controls

  uniqueFeeds(articles) {
    let uniqueFeedList = [];
    articles.forEach((element) => {
      if (uniqueFeedList.indexOf(element.feed.name) === -1) {
        uniqueFeedList.push(element.feed.name);
      }
    })
    return uniqueFeedList;
  }

  toggleDD() {
    this.setState({
      dropdownShowing: !this.state.dropdownShowing
    })
  }

  filterArticles(e) {
    e.preventDefault();
    let checkboxes = document.getElementsByClassName('dropdown__input');
    let checkedSources = [];
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        checkedSources.push(checkboxes[i].value);
      }
    }
    // Filtering an array from another array - http://stackoverflow.com/questions/34901593/how-to-filter-an-array-from-all-elements-of-another-array
    let filteredArray = this.state.feed.filter(function (element) {
      return (checkedSources.indexOf(element.feed.name) >= 0);
    })
    this.setState({
      dropdownShowing: false,
      feed: filteredArray,
      filterOn: true
    })
  }

  dropdownShrunk(){
    let header = document.querySelector('.header');
    if (header.classList.contains('header--shrink')){
      let dropdown = document.querySelector('.dropdown');
      dropdown.id = 'dropdown--shrink'
    }
  }

  componentDidUpdate(prevProps, prevState){
    if (!prevState.dropdownShowing){
      this.dropdownShrunk();
    }
  }

  render() {
    // Dropdown Menu
    let dropdownPlaceholderMap = [];
    let buttons;
    let dropdown;
    if (this.state.dropdownShowing && !this.state.filterOn) {
      buttons = (<div className="dropdown__button">
        <button onClick={this.filterArticles} className="dropdown__button--btn">Filter</button>
      </div>)
    } else if (this.state.dropdownShowing && this.state.filterOn) {
      buttons = (<div className="dropdown__button>">
        <button onClick={this.filterArticles} className="dropdown__button--filter">Filter</button>
        <button onClick={this.refreshFeed} className="dropdown__button--refresh">Refresh</button>
      </div>
      )
    }

    if (this.state.dropdownShowing) {
      let uniqueFeedList = this.uniqueFeeds(this.state.feed)
      dropdownPlaceholderMap = uniqueFeedList.map((element, index) => {
        return (
          <li className="dropdown__li" key={index}>
            <input className="dropdown__input" value={element} type="checkbox" />
            {element}
          </li>
        )
      })
      dropdown = (
        <div className='dropdown'>
          <div className='dropdown__arrow--up'></div>
          <form>
            <ul>
              {dropdownPlaceholderMap}
            </ul>
            {buttons}
          </form>
        </div>
      )
    }

    // Get Published Date
    let d = new Date();
    let dh1Day = d.getDate()
    let dh1Month = (d.getMonth()) + 1;
    // check if dh1Month or dh1Day has a single digit.
    if (/^\d$/.test(dh1Month)) {
      dh1Month = "0" + dh1Month;
    } else if (/^\d$/.test(dh1Day)) {
      dh1Day = "0" + dh1Day;
    }

    if (!this.state.loading) {
      return (
        <div className="appRoot">
          <div className="header">
            <div className="header--inner">
              <h1>Today's Top Stories <span>| {dh1Month}.{dh1Day} |</span></h1>
              <nav>
                <a onClick={this.refreshFeed} className="header__refresh"><i className="fa fa-refresh" aria-hidden="true" ></i></a>
                <a className="header__filter" id="dLabel" onClick={this.toggleDD}><i className="fa fa-filter" aria-hidden="true"></i></a>
                {dropdown}
                <a id="header__login">Login</a>
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
    } else {
      return (
        <div className="appRoot">
          <div className="header">
            <div className="header--inner">
              <h1>Today's Top Stories | {dh1Month}.{dh1Day}</h1>
              <nav>
                <a onClick={this.refreshFeed} className="header__refresh"><i className="fa fa-refresh" aria-hidden="true" ></i></a>
                <a className="header__filter" id="dLabel" onClick={this.toggleDD}><i className="fa fa-filter" aria-hidden="true"></i></a>
                {dropdown}
                <a id="header__login">Login</a>
              </nav>
            </div>
          </div>
          <ReactCSSTransitionGroup
            component="div"
            className="loading__group"
            transitionName="flash"
            transitionAppear={true}
            transitionAppearTimeout={5000}
            transitionEnterTimeout={0}
            transitionLeaveTimeout={0}
          >
            <Loading
              key={1}
            />
          </ReactCSSTransitionGroup>
        </div>
      )
    }
  }
}

export default App;
