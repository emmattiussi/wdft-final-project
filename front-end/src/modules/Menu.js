import React, { Component } from 'react';

class Menu extends Component {
    render(){
        let sourceList = this.props.feedList.map((element, index) => {
            return (
                <li key={index}>
                    <input type="checkbox" name={element.feed.name} value={element.feed.name}></input>
                    {element.feed.name}
                </li>
            )    
        })
        return(
            <select>
                
                <input type="submit" value="submit"/>
            </select>
        )
    }
}

export default Menu;