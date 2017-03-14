import React, { Component } from 'react';
import Masonry from 'react-masonry-component';


let masonryOptions = {
    transitionDuration: 500
}

class Card extends Component {
    render(){
        let cardArray = this.props.articles.data.map((element, index) => {
            return (
                <div className="col-lg-3 col-md-3 col-sm-4">
                    <figure key={index} className='card'>
                        <img className="card__img" src={element.image} alt={element.alt}/>
                        <figcaption>
                            <h3>{element.title}</h3>
                            <p>{element.content}</p>
                        </figcaption>
                    </figure>
                </div>
            )
        })
        return(
            <Masonry 
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