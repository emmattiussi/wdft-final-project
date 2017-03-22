import React, { Component } from 'react';

class Menu extends Component {
    constructor() {
        super()
        this.uniqueFeeds = this.uniqueFeeds.bind(this);
    }

    uniqueFeeds(articles) {
        console.log('in unique feeds')
        console.log(`typeof articles in uniqueFeeds is ${typeof articles}`)
        let uniqueFeedList = [];
        articles.forEach((element) => {
            if (uniqueFeedList.indexOf(element.feed.name) === -1) {
                uniqueFeedList.push(element.feed.name);
            }
        })
        return uniqueFeedList;
    }

    render() {
        console.log(`typeof articles in render is ${typeof this.props.articles}`)
        let dropdownPlaceholderMap = [];
        let buttons;
        let dropdown;
        if (this.props.dropdownShowing && !this.props.filterOn) {
            let uniqueFeedList = this.uniqueFeeds(this.props.articles);
            dropdownPlaceholderMap = uniqueFeedList.map((element, index) => {
                return (
                    <li className="dropdown__li" key={index}>
                        <input className="dropdown__input" value={element} type="checkbox" />
                        {element}
                    </li>
                )
            })
            buttons = (<div className="dropdown__button">
                <button onClick={this.props.filterArticles} className="dropdown__button--btn">Filter</button>
            </div>)
            dropdown = (
                <div className='dropdown'>
                    <div className='dropdown__arrow--up'></div>
                    <form>
                        <ul>
                            {dropdownPlaceholderMap}
                        </ul>
                        {buttons}
                    </form>
                </div>
            )
        } else if (this.props.dropdownShowing && this.props.filterOn) {
            let uniqueFeedList = this.uniqueFeeds(this.props.articles);
            dropdownPlaceholderMap = uniqueFeedList.map((element, index) => {
                return (
                    <li className="dropdown__li" key={index}>
                        <input className="dropdown__input" value={element} type="checkbox" />
                        {element}
                    </li>
                )
            })
            buttons = (<div className="dropdown__button>">
                <button onClick={this.props.filterArticles} className="dropdown__button--filter">Filter</button>
                <button onClick={this.props.refreshFeed} className="dropdown__button--refresh">Refresh</button>
            </div>
            )
            dropdown = (
                <div className='dropdown'>
                    <div className='dropdown__arrow--up'></div>
                    <form>
                        <ul>
                            {dropdownPlaceholderMap}
                        </ul>
                        {buttons}
                    </form>
                </div>
            )
        }
        if (dropdown === null){
            return (null)
        } else {
            return (
                <span>
                    {dropdown}
                </span>
            )
        }
    }
}


export default Menu;