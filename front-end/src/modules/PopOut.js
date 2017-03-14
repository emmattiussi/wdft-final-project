import React, { Component } from 'react';
const Modal = require('react-bootstrap').Modal;

class PopOut extends Component{
    render(){
        return(
            <Modal 
                show={this.props.showModal}
                autoFocus={true}
                onHide={this.props.closeModal}
            >
                <Modal.Body>
                    <div className="modal__logo">
                        <img className="modal__logo--img" src={this.props.articles[this.props.index].logo} alt="Source Logo"/>
                    </div>
                    <div className="modal__save">
                        <i className="fa fa-bookmark-o" aria-hidden="true"></i>
                    </div>
                    <div className="modal__link">
                        <i className="fa fa-external-link" aria-hidden="true"></i>
                    </div>
                    <div className="modal__content">
                        <h4>{this.props.articles[this.props.index].title}</h4>
                        <p>{this.props.articles[this.props.index].content}</p>
                        <img src={this.props.articles[this.props.index].image} alt={this.props.articles[this.props.index].alt}/>
                    </div>
                </Modal.Body>
                <Modal.Footer className="modal__footer">
                    <button onClick={this.props.closeModal}><i className="fa fa-times" aria-hidden="true"></i></button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default PopOut;

 