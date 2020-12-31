import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

const Nav = () => {
    return (
        <nav className="nav-header">
            <Link to="/">
                <p className="nav-title">Inventory Management App</p>
            </Link>
            <ul className="nav-items">
                <Link to="/locations">
                    <li>Locations</li>
                </Link>
                <Link to="/products">
                    <li>Products</li>
                </Link>
                <Link to="/productmovement">
                    <li>Product Movement</li>
                </Link>
            </ul>
        </nav>
    );
}

export default Nav;