import React, { Component } from 'react';
import Masonry from 'react-masonry-component';

// Modules

// import PopOut from './PopOut'

let masonryOptions = {
    transitionDuration: 0
}

class Card extends Component {
    constructor(){
        super();
        this.slideshowNavigation=this.slideshowNavigation.bind(this);
    }

    // Slideshow styles adapted from Codrops - https://tympanus.net/Blueprints/GridGallery/
    // See full reference in App.js

    slideshowNavigation(keyCode){
        if (this.props.showPopOut){
            switch(keyCode) {
                    // Left Arrow Key
                    case 37: 
                        this.props.prevArticle()
                        break;
                    // Right Arrow Key
                    case 39:
                        this.props.nextArticle()
                        break;
                    // Escape Key
                    case 27:
                        this.props.closePopOut();
                        break;
                    default: 
                        break;
                }
        }
    }

    componentDidMount(){
        document.addEventListener('keydown', (event) => {
            let selectedKey = event.keyCode || event.which; 
            this.slideshowNavigation(selectedKey);
        })
    }

    componentWillUnmount(){
        document.removeEventListener('keydown', this.slideshowNavigation)
    }

    render(){
        let cardArray = this.props.articles.map((element, index) => {
            return (
                <div key={index} className="card__div col-lg-12">
                    <figure className='card' onClick={() => {this.props.openPopOut(index)}}>
                        {/*<img className="card__img" src={element.image} alt={element.alt}/>*/}
                        <div className="card__logo">
                            <img className="card__logo--img" src={element.logo} alt="Source Logo"/>
                        </div>
                        <figcaption>
                            <h3 className="card__h3">{element.title}</h3>
                        </figcaption>
                    </figure>
                    {/*<PopOut 
                        showPopOut={this.props.showPopOut}
                        currentKey={this.props.articleViewing}
                        popOutKey={index}
                    />*/}
                </div>
            )
        })
        let slideshowCardArray = this.props.articles.map((element, index) => {
            if (element.image){
            return (
                <div key={index} className="card__div">
                    <figure className="card">
                        <div className="card__div--img">
                            <img className="card__img" src={element.image} alt={element.alt}/>
                        </div>
                        <figcaption>
                            <h3 className="card__h3">{element.title}</h3>
                            <p className="card__p">{element.content}</p>
                        </figcaption>
                        <div className="card__icon">
                            <div>
                                <img className="card__icon--img" src={element.logo} alt="Source Logo"/>     
                            </div>
                            <div>
                                <i className="card__icon--save fa fa-bookmark-o" aria-hidden="true"></i>
                            </div>
                            <div>
                                <i className="card__icon--link fa fa-external-link" aria-hidden="true"></i>
                            </div>
                        </div>
                    </figure>
                </div>
            )} else {
                return (
                    <div key={index} className="card__div">
                    <figure className="card">
                        <figcaption>
                            <h3 className="card__h3">{element.title}</h3>
                            <p className="card__p">{element.content}</p>
                        </figcaption>
                        <div className="card__icon">
                            <div>
                                <img className="card__icon--img" src={element.logo} alt="Source Logo"/>     
                            </div>
                            <div>
                                <i className="card__icon--save fa fa-bookmark-o" aria-hidden="true"></i>
                            </div>
                            <div>
                                <i className="card__icon--link fa fa-external-link" aria-hidden="true"></i>
                            </div>
                        </div>
                    </figure>
                </div>
                )
            }
        })   
        return(
            <div className="cardRoot">
                <Masonry 
                    className="masonryRoot container"
                    options={masonryOptions} // default {} 
                    disableImagesLoaded={false} // default false 
                    updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false 
                >
                    {cardArray}
                </Masonry>
                <div className="slideshow">
                    <nav>
                        <span className="icon nav-prev">
                            <i className="fa fa-arrow-left" 
                                aria-hidden="true" 
                                onClick={this.props.prevArticle}>
                            </i>
                        </span>
                        <span className="icon nav-next">
                            <i className="fa fa-arrow-right" 
                                aria-hidden="true"
                                onClick={this.props.nextArticle}>
                            </i>
                        </span>
                        <span className="icon nav-close">
                            <i className="fa fa-times" 
                                aria-hidden="true"
                                onClick={this.props.closePopOut}>
                            </i>
                        </span>
                    </nav>
                    <div className="cardRoot--visible">
                        {slideshowCardArray[this.props.articleViewing]}
                    </div>
                    <div className="info-keys icon">Navigate with arrow keys</div>
                    <div className="info-esc icon">Press esc to quit</div>
                </div>
            </div>  
        )
    }
}

export default Card; 
