import React, { Component } from 'react';
import Masonry from 'react-masonry-component';

// Modules

import PopOut from './PopOut'

let masonryOptions = {
    transitionDuration: 0
}

class Card extends Component {
    render(){
        let cardArray = this.props.articles.data.map((element, index) => {
            return (
                <div key={index} className="card__div col-lg-3 col-md-3 col-sm-6">
                    <a href="#" onClick={() => {this.props.openModal(index)}}>
                        <figure className='card'>
                            <img className="card__img" src={element.image} alt={element.alt}/>
                            <figcaption>
                                <h3 className="card__h3">{element.title}</h3>
                                {/*<p className="card__p">{element.content}</p>*/}
                            </figcaption>
                            <div className="card__logo">
                                <img className="card__logo--img" src={element.logo} alt="Source Logo"/>
                            </div>
                        </figure>
                    </a>
                </div>
            )
        })
        return(
            <Masonry 
                className="cardRoot modal-container"
                options={masonryOptions} // default {} 
                disableImagesLoaded={false} // default false 
                updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false 
            >
                {cardArray}
                <PopOut 
                    showModal={this.props.showModal} 
                    closeModal={this.props.closeModal}
                    articles={this.props.articles.data}
                    index={this.props.modalViewing}
                />
            </Masonry>
        )
    }
}

export default Card; 