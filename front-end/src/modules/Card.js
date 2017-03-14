import React, { Component } from 'react';
import Masonry from 'react-masonry-component';


let masonryOptions = {
    transitionDuration: 0
}

class Card extends Component {
    render(){
        let cardArray = this.props.articles.data.map((element, index) => {
            return (
                <div key={index} className="clearfix col-lg-3 col-md-3 col-sm-6">
                    <figure className='card'>
                        <img className="card__img" src={element.image} alt={element.alt}/>
                        <figcaption>
                            <h3 className="card__h3">{element.title}</h3>
                            <p className="card__p">{element.content}</p>
                        </figcaption>
                        <div className="card__logo">
                            <img className="card__logo--img" src={element.logo} alt="Source Logo"/>
                        </div>
                    </figure>
                </div>
            )
        })
        return(
            <Masonry 
                className="cardRoot"
                options={masonryOptions} // default {} 
                disableImagesLoaded={false} // default false 
                updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false 
            >
                {cardArray}
            </Masonry>
        )
    }
}

export default Card; 