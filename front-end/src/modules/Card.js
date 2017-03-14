import React, { Component } from 'react';
import Masonry from 'react-masonry-component';
const Modal = require('react-bootstrap').Modal;


let masonryOptions = {
    transitionDuration: 0
}

class Card extends Component {
    render(){
        let cardArray = this.props.articles.data.map((element, index) => {
            return (
                <div key={index} className="card__div col-lg-3 col-md-3 col-sm-6">
                    <a href="#" onClick={this.props.openModal}>
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
                <Modal 
                    show={this.props.showModal}
                    autoFocus={true}
                    onHide={this.props.closeModal}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Fake Title</h4>
                        <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <button onClick={this.props.closeModal}>Close</button>
                    </Modal.Footer>
                </Modal>
            </Masonry>
        )
    }
}

export default Card; 