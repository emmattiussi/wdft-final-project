import React, { Component } from 'react';

class Loading extends Component {
    render(){
        return(
            <div className="card__div--loading col-lg-12">
                <figure className='card--loading row'>
                        <div className="card__logo--loading col-sm-3 col-md-2 col-lg-2"></div>
                        <figcaption className="col-md-9 col-lg-9 col-sm-8">
                            <div className="card__h3--loading"></div>
                            <div className="card__published--loading"></div>
                        </figcaption>
                    <div className="col-lg-1 col-sm-1 col-md-1 card__link--loading"></div>
                </figure>
            </div>
        )
    }
}

export default Loading