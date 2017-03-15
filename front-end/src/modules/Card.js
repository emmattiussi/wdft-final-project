import React, { Component } from 'react';
import Masonry from 'react-masonry-component';

// Modules

// import PopOut from './PopOut'

let masonryOptions = {
    transitionDuration: 0
}

class Card extends Component {

    render(){
        let cardArray = this.props.articles.data.map((element, index) => {
            return (
                <div key={index} className="card__div col-lg-4 col-md-4 col-sm-6">
                    <figure className='card' onClick={() => {this.props.openPopOut(index)}}>
                        <img className="card__img" src={element.image} alt={element.alt}/>
                        <figcaption>
                            <h3 className="card__h3"><span className="align-middle">{element.title}</span></h3>
                            {/*<p className="card__p">{element.content}</p>*/}
                        </figcaption>
                        <div className="card__logo">
                            <img className="card__logo--img" src={element.logo} alt="Source Logo"/>
                        </div>
                    </figure>
                    {/*<PopOut 
                        showPopOut={this.props.showPopOut}
                        currentKey={this.props.articleViewing}
                        popOutKey={index}
                    />*/}
                </div>
            )
        })
        return(
            <div className="cardRoot">
                <Masonry 
                    className="masonryRoot"
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
                                onClick={this.props.articleViewing > 0 ? this.props.prevArticle : null}>
                            </i>
                        </span>
                        <span className="icon nav-next">
                            <i className="fa fa-arrow-right" 
                                aria-hidden="true"
                                onClick={this.props.articleViewing < cardArray.length ? this.props.nextArticle : null}>
                            </i>
                        </span>
                        <span className="icon nav-close"><i className="fa fa-times" aria-hidden="true"></i></span>
                    </nav>
                    <div className="cardRoot--visible">
                        {cardArray[this.props.articleViewing]}
                    </div>
                    <div className="info-keys icon">Navigate with arrow keys</div>
                </div>
            </div>  
            // 
        )
    }
}

export default Card; 
