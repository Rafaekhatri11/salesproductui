import React, { Component } from 'react';
import { Navbar, NavItem, Nav, } from 'react-bootstrap';
import { Link } from 'react-router-dom';




class Admin extends Component {
    constructor() {
        super();
        this.state = {
            product: true,
            show: false,
            quantityvalue: null,
            quantityid: ""
        }
    }


    logOut(){
        this.props.props.history.push("/");
    }
    render() {
        return (
            <div>
                <Navbar inverse collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a style={{ color: '#e535ab' }}>Admin</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav>
                        <NavItem onClick={() => this.setState({ product: true })} eventKey={1} href="#">
                            <Link style={{ color: 'lightgrey' }} to="/adminproductlist"> Products </Link>
                        </NavItem>
                        <NavItem onClick={() => this.setState({ product: false })} eventKey={2} href="#">
                            <Link style={{ color: 'lightgrey' }} to="/adminuser"> Users </Link>
                        </NavItem>
                        <NavItem onClick={() => this.setState({ product: false })} eventKey={2} href="#">
                            <Link style={{ color: 'lightgrey' }} to="/adminsoldproduct"> Sales Products </Link>
                        </NavItem>
                        
                        <NavItem onClick={()=> this.logOut()} eventKey={2}>
                            Log Out
                  </NavItem>


                    </Nav>
                </Navbar>

            </div>
        );
    }
}



export default Admin;