import React, { Component } from 'react';
import { Navbar, NavItem, Nav, } from 'react-bootstrap';
import { Link } from 'react-router-dom';
//import { Query, compose, graphql, } from "react-apollo";
// import gql from 'graphql-tag';


// const listofproducts = gql`
// {
//     productlist{
//       id
//       Name
//       Quantity
//       Amount
//     }
//   }
// `

class Userside extends Component {
    constructor() {
        super();
        this.state = {
            products: true,
            show: false
        }
    }

    handleClose() {
        this.setState({ show: false })
    }

    handleShow() {
        this.setState({ show: true })
    }

    logOut() {
        localStorage.clear();
        this.props.props.history.push('/')
    }
    render() {
        return (
            <div>
                <Navbar inverse collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a style={{color:'#e535ab'}}>Sales</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav>
                        <NavItem  >
                            <Link style={{color:'lightgrey'}} to="Productlist"> Products </Link>
                        </NavItem>
                        <NavItem>
                            <Link style={{color:'lightgrey'}}  to="Purchaselist">Purchase List</Link>
                        </NavItem>
                        <NavItem onClick={() => this.logOut()} >
                           
                                Log Out
                           
                        </NavItem>
                    </Nav>
                </Navbar>

            </div>
        );
    }
}

export default Userside;