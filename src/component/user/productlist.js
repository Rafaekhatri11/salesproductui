import React, { Component } from 'react';
import { Table, Modal, Button, FormControl } from 'react-bootstrap';
import { Query, compose, graphql } from "react-apollo";
import gql from 'graphql-tag';
import Userside from './product';
var jwt = require('jsonwebtoken');


const listofproducts = gql`
{
    productlist{
      id
      Name
      Quantity
      Amount
    }
  }
`;

const purchasepro = gql`
  mutation($userid:ID!, $email:String!, $proid: ID!,$proname: String!,$quantity: ID!){
    purchaseproduct(userId:$userid , Email: $email, productid:$proid,  productname:$proname, quantity: $quantity){
        
       userid
       Name
       Quantity
       Productid
       Email
    }
  }
`


class Productlist extends Component {
    componentWillMount() {
        var data = localStorage.getItem('userdata');
        var userdata = JSON.parse(data);
            jwt.verify(userdata.token, 'secret', (err, decoded) => {
                console.log(decoded);
                this.setState({ userdata: { uid: decoded.userId, Email: decoded.email } })
            });

       
    }
    constructor() {
        super();
        this.state = {
            products: true,
            show: false,
            userdata: {},
            tempobj: null
        }
    }
    handleClose() {
        this.setState({ show: false })
    }

    handleShow(text) {
        console.log(text);
        this.setState({
            show: true,
            tempobj:text
        });
    }

    updateQuantity() {
        if (this.state.quantityvalue === "" || this.state.quantityvalue === " ") {
            alert('Please Enter Quantity');
        }
        if (this.state.quantityvalue === "0") {
            alert("Please give proper amount");
        }
        else {
            this.props.purchaseproduct({
                variables:{
                    userid:this.state.userdata.uid,
                    email:this.state.userdata.Email,
                    proid:this.state.tempobj.id,
                    proname:this.state.tempobj.Name,
                    quantity:this.state.quantityvalue
            },
            refetchQueries:[{query : listofproducts}]
            })
            this.setState({show :false});
        
        }
    }
    render() {
        return (
            <div>
                <Userside props={this.props} />
                <div>
                    {

                        <Query query={listofproducts} >
                            {({ loading, error, data,refetch }) => {
                                if (loading) return "Loading...";
                                if (error) return `Error! ${error.message}`;
                                return (<Table>
                                    <thead>
                                        <tr style={{ color: "#e535ab", textAlign: 'center', fontWeight: 'bold' }}>
                                            <td>Name</td>
                                            <td>Quantity</td>
                                            <td>Price</td>
                                            <td>Purchase</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.productlist.map((text, index) => {
                                            
                                            return (

                                                <tr style={{ color: 'white', textAlign: 'center' }} key={text.id}>
                                                    <td >{text.Name}</td>
                                                    <td >{text.Quantity}</td>
                                                    <td >{text.Amount}</td>
                                                    <td><Button disabled={!Number(text.Quantity)} 
                                                    bsStyle="primary" onClick={() => this.handleShow(text)}>Purchase</Button></td>

                                                </tr>

                                            );
                                        })}

                                    </tbody>
                                   
                                        <Modal show={this.state.show} onHide={() => this.handleClose()}>
                                            <h1 style={{ textAlign: 'center' }}>Please Enter Quantity</h1>
                                            <form style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>

                                                <FormControl bsSize="sm" type="number" style={{ width: '20%' }}
                                                    onChange={(evt) => this.setState({ quantityvalue: evt.target.value })} />
                                                <Button bsStyle="primary" onClick={() =>{ this.updateQuantity(),()=>refetch()}}>Done</Button>
                                            </form>
                                        </Modal>
                                  
                                </Table>)
                            }}
                        </Query>

                    }
                </div>
            </div>
        );
    }
}

export default compose(
    graphql(purchasepro,{name:'purchaseproduct'})
)
( Productlist);