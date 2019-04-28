import React, { Component } from "react";
import './LeftDrawer.css';

class LeftDrawer extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            visible: false
        };

        this.toggleMenu = this.toggleMenu.bind(this);
    }

    toggleMenu() {
        this.setState({
            visible: !this.state.visible
        });
    }

    render() {
        let drawerClasses = ['left-side-drawer'];
        if (this.props.show) {
            drawerClasses.push('open');
        }
        return (
            <div className={drawerClasses.join(' ')}>
                <div className="drawer-links">
                    {this.props.links}
                </div>
            </div>
        );
    }
}

export default LeftDrawer;