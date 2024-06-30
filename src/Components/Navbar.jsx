import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import classes from './Navbar.module.css';
import Button from 'react-bootstrap/Button';
import { signOut } from "firebase/auth";
import { auth } from '../firebase';
import { useSelector } from 'react-redux';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { selectTotalItems } from '../slices/CartItemCounterSlice';

const Navbar = () => {
    const itemcount = useSelector(selectTotalItems);

    const userSignOut = async () => {
        try {
            await signOut(auth);
            console.log('Sign out successful.');
        } catch (error) {
            console.log('Error signing out:', error);
        }
    };

    return (
        <div className={classes.navbar_container}>
            <div>
                <h3>SHOP<span style={{ color: 'green' }}>LANE</span></h3>
            </div>
            <div>
                <Nav className="justify-content-center" activeKey="/home">
                    <Nav.Item>
                        <Link className={classes.link} to="/">HOME</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link className={classes.link} to="/clothings">CLOTHINGS</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link className={classes.link} to="/accessories">ACCESSORIES</Link>
                    </Nav.Item>
                </Nav>
            </div>
            <div className={classes.cartcontainer}>
                <div className={classes.cart}>
                    <ShoppingCartIcon />
                    <p>{itemcount || 0}</p>
                </div>
                <Button variant="secondary" onClick={userSignOut}>Logout</Button>
            </div>
        </div>
    );
};

export default Navbar;
