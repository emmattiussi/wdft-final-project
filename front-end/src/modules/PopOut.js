import React, { Component } from 'react';
// const Modal = require('react-bootstrap').Modal;

class PopOut extends Component{

    render(){
        let styles={
               display: "none"
            }
        console.log(this.props.showPopOut)
        console.log(this.props.currentKey)
        console.log(this.props.popOutKey)
        if (this.props.showPopOut && this.props.currentKey===this.props.popOutKey && this.props.popOutKey % 3===0){
            styles={
                display: "block",
            }
        } else if (this.props.showPopOut && this.props.currentKey===this.props.popOutKey && (this.props.popOutKey-1) % 3=== 0){
            styles={
                display: "block",
                left: "-100%"
            }
        } else if (this.props.showPopOut && this.props.currentKey===this.props.popOutKey && (this.props.popOutKey-2) % 3 ===0) {
            styles={
                display: "block",
                left: "-200%"       
            }
        } else {
            styles={
                display: "none"
            };
        }
        console.log(styles)
        return(
            <div id={this.props.popOutKey} className="popOutRoot" style={styles}>
                Pop Out Working!
            </div>
        )
    }
}

export default PopOut;

 /*<Modal 
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
            </Modal>*/