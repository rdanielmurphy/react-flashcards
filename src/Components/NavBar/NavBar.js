import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu'
import FA from 'react-fontawesome'
import StaticDataService from '../../Services/StaticDataService';
import './NavBar.css';
import { Link } from 'react-router-dom'

class NavBar extends Component {

    componentDidMount() {
        var scope = this;
        StaticDataService.addCardChangeListener(function (name, current, max) {
            let result;
            if (isNaN(current)) {
                result = "Finished!";
            } else {
                result = (parseInt(current, 10) + 1) + "/" + max;
            }
            scope.setState({ name: name, count: result });
        });
    }

    handleClick = (e) => {
        this.setState({ name: e.currentTarget.name, count: "" });
        this._menu.setState({ isOpen: false });
    }

    render() {
        const getObjects = () => {
            const objs = []
            for (var key in StaticDataService.getCards()) {
                let url = '/' + key + '/1';
                let card = StaticDataService.getCards()[key];
                objs.push(<Link id={key} key={key} className="menu-item" name={card.name} to={url} onClick={this.handleClick.bind(this)}><FA name={card.fa} />&nbsp;&nbsp;&nbsp;<span>{card.name}</span></Link>);
            }

            return objs;
        }

        return (
            <div>
                <div className="flashcardnavbar">
                    <h4 className="navbarHeader">
                        Flashcards
                    </h4>
                    <h6 className="navbarSubHeader">
                        {this.state ? (this.state.name + " (" + this.state.count + ")") : ""}
                    </h6>
                </div>
                <Menu ref={(menu) => { this._menu = menu; }}>
                    {getObjects()}
                </Menu>
            </div>
        );
    }
}

export default NavBar;