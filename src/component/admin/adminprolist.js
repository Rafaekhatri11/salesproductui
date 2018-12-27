import React, { Component } from 'react'
import Admin from './admin';
import gql from "graphql-tag";
import { Query, compose, graphql, } from "react-apollo";
import { Table, Modal, Button } from 'react-bootstrap';
const Productlist = gql`
{
    productlist{
      id
      Name
      Quantity
      Amount
    }
  }
`
const updateQuantity = gql`
    mutation($id:ID!, $Quantity: ID!){
        editproduct(id:$id , Quantity: $Quantity){
            id
            Name
            Quantity
            Amount
        }
    }
`

class AdminProductlist extends Component {
    constructor() {
        super();
        this.state = {
            product: true,
            show: false,
            quantityvalue: null,
            quantityid: ""
        }
    }
    updateQuantity() {
        console.log(this.state.quantityvalue, this.state.quantityid);
        this.props.editproduct({
            variables: {
                id: this.state.quantityid.toString(),
                Quantity: this.state.quantityvalue.toString()
            },
            refetchQueries: [{ query: Productlist }]
        })
        this.setState({ show: false })
    }
    handleClose() {
        this.setState({ show: false });
    }

    handleShow(text) {
        this.setState({ show: true, quantityid: text.id, quantityvalue: text.Quantity });

    }

    render() {
        return (
            <div>
                <Admin props={this.props}/>
                <Query
                    query={Productlist}>
                    {({ loading, error, data }) => {
                        if (loading) return "Loading...";
                        if (error) return `Error! ${error.message}`;

                        return (<Table>
                            <thead>
                                <tr style={{ color: "#e535ab", textAlign: 'center', fontWeight: 'bold' }}>
                                    <td>Name</td>
                                    <td>Quantity</td>
                                    <td>Price</td>
                                    <td>Edit Quantity</td>
                                </tr>
                            </thead>
                            <tbody>
                                {data.productlist.map((text, index) => {
                                    return (

                                        <tr style={{ color: 'white', textAlign: 'center' }} key={text.id}>
                                            <td >{text.Name}</td>
                                            <td >{text.Quantity}</td>
                                            <td >{text.Amount}</td>
                                            <td><Button bsStyle="primary" onClick={() => this.handleShow(text)}>edit Quantity</Button></td>

                                        </tr>

                                    );
                                })}</tbody>
                            <Modal show={this.state.show} onHide={() => this.handleClose()}>
                                <h1>Update your Quantity</h1>
                                <input type="number" onChange={(evt) => this.setState({ quantityvalue: evt.target.value })} />
                                <Button bsStyle="primary" onClick={() => this.updateQuantity()}>Update</Button>
                                <Button bsStyle="danger" onClick={() => this.handleClose()}>Cancel</Button>
                            </Modal>
                        </Table>)
                    }}
                </Query>


            </div>
        );
    }
}


export default compose(
    graphql(updateQuantity, { name: "editproduct" })
)(AdminProductlist);