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
        this.cardMap = this.cardMap.bind(this);
        this.slideshowCardMap = this.slideshowCardMap.bind(this);
        this.slideshowCardMapNoImage = this.slideshowCardMapNoImage.bind(this);
    }

    cardMap(element, index){
        return (
            <div key={index} id={index} className="animate card__div col-lg-12">
                <figure className='card'>
                        <div className="card__logo" onClick={() => {this.props.openPopOut(index)}}>
                            <img className="card__logo--img" src={element.logo} alt="Source Logo"/>
                        </div>
                        <figcaption onClick={() => {this.props.openPopOut(index)}}>
                            <h3 className="card__h3">{element.title}</h3>
                        </figcaption>
                    <div className="card__link--div">
                        <a href={element.link} target='blank'><i className="card__link fa fa-external-link" aria-hidden="true"></i></a>
                    </div>
                </figure>   
            </div>
        )
    }

    slideshowCardMap(element, index){
        return (<div key={index} className="card__div">
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
            </div>)
    }
    
    slideshowCardMapNoImage(element, index){
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

    render(){
        let cardArray = this.props.articles.map((element, index) => {
            return (
                this.cardMap(element, index)
            )
        })
        let slideshowCardArray = this.props.articles.map((element, index) => {
            if (element.image){
            return (
                this.slideshowCardMap(element, index)
            )} else {
                return (
                this.slideshowCardMapNoImage(element, index)
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
