import React, { Component } from 'react';
import StaticDataService from '../../Services/StaticDataService';
import './NavBar.css';
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import LeftDrawer from '../LeftDrawer/LeftDrawer';
import Backdrop from '../Backdrop/Backdrop';

class NavBar extends Component {

    state = {
        drawerOpen: false
    };

    toggleDrawer(open) {
        this.setState({
            drawerOpen: open
        });
    };

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
        this.setState({ drawerOpen: false, name: e.currentTarget.name, count: "" });
    }

    backdropClick = () => {
        this.setState({ drawerOpen: false });
    }

    render() {
        const getLinks = () => {
            const objs = []
            for (var key in StaticDataService.getCards()) {
                let url = '/' + key + '/1';
                let card = StaticDataService.getCards()[key];
                objs.push(
                    <Link id={key} key={key} className="menu-item" name={card.name} to={url} onClick={this.handleClick.bind(this)}>
                        <Typography variant="h3" className="menu-item-text">
                            {card.name}
                        </Typography>
                    </Link>);
                objs.push(<br />);
            }

            return objs;
        }

        let backdrop;
        if (this.state.drawerOpen) {
            backdrop = <Backdrop click={this.backdropClick}></Backdrop>;
        }

        return (
            <div>
                <div className="grow">
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton className="menu-button" color="inherit" aria-label="Menu" onClick={() => this.toggleDrawer(!this.state.drawerOpen)}>
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h4" color="inherit" className="grow">
                                Flashcards
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </div>
                <LeftDrawer show={this.state.drawerOpen} links={getLinks()}></LeftDrawer>
                {backdrop}
            </div>
        );
    }
}

export default NavBar;