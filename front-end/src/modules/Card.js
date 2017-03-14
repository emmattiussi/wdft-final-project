import React, { Component } from 'react';
import Masonry from 'react-masonry-component';

let masonryOptions = {
    transitionDuration: 0
}

class Card extends Component {
    render(){
        let cardArray = this.props.articles.data.map((element, index) => {
            return (
                <figure key={index} className='cardArticle col-md-3'>
                    <img src={element.image} alt={element.alt}/>
                    <figcaption>
                        <h3>{element.title}</h3>
                        <p>{element.content}</p>
                    </figcaption>
                </figure>
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