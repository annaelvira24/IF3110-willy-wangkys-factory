import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from "prop-types";
import Cookies from 'universal-cookie';
import './NavigationBar.css';



class NavigationBar extends Component {
    state = {
        cookie: undefined
    }

    constructor() {
        super();
        const cookie = new Cookies();
        this.state.cookie = cookie.get("userFactory");

    }

    handleLogout = async e => {
        e.preventDefault();

        const cookies = new Cookies();
        cookies.remove('userFactory', { path: '/' });
        window.location.reload();
    }

    render() {
        return (
            <div className="navbar">
                <div className="navbar-wrapper">
                        <Link to='/home' id = "a-navbar">
                            <div className="navbar-button">
                                {/*<img src={name} className="App-logo" alt="name" width="150" height="50" />*/}
                                <font color = "#8b4513"> WW Factory </font>
                            </div>
                        </Link>


                    {!(this.props.location.pathname == "/home") && (
                        <Link to='/order'>
                            <div className="navbar-button">
                                <font color="white">Order</font>
                            </div>
                        </Link>
                    )}

                    {!(this.props.location.pathname == "/home") && (
                        <Link to='/inventory'>
                            <div className="navbar-button">
                                <font color="white">Inventory</font>
                            </div>
                        </Link>
                    )}

                    {!(this.props.location.pathname == "/home") && (
                    <Link to='/balance' id = "a-navbar">
                        <div className="navbar-button">
                            <font color="white">Balance</font>
                        </div>
                    </Link>
                    )}

                    <Link to='/login'>
                        <div className="navbar-button" id="button-logout">
                            <font color="white" onClick={this.handleLogout}>Logout</font>
                        </div>
                    </Link>

                </div>
            </div>
        );
    }
};

export default withRouter(NavigationBar);
