import React, { Component } from 'react';
import { Table, } from 'react-bootstrap';
import { Query, } from "react-apollo";
import gql from 'graphql-tag';
import Userside from './product';
var jwt = require('jsonwebtoken');


const listofpurchase = gql`
{
    
        userproducts{
          Amount
          quantity
          Email
          Productname
          Productname
          userid
        }
      
  }
`;

class Purchaselist extends Component {

    constructor() {
        super();
        this.state = {
            userdata: {},
            flag: false,
            text :'No data'
        }
    }
    componentWillMount() {
        var data = localStorage.getItem('userdata');
        var userdata = JSON.parse(data);
            jwt.verify(userdata.token, 'secret', (err, decoded) => {
                console.log(decoded);
                this.setState({ userdata: { uid: decoded.userId, Email: decoded.email } })
            });
    }
    render() {
        console.log("============");
        return (
            <div>
                <Userside props={this.props} />
                <div>
                    <Query
                     fetchPolicy={'network-only'}
                     query={listofpurchase}>
                        {({ loading, error, data }) => {
                            if (loading) return <div>Loading...</div>
                            if (error) return `Error!: ${error}`;
                            return (
                                <Table>
                                    <thead>
                                        <tr style={{ color: "#e535ab", textAlign: 'center', fontWeight: 'bold' }}>
                                            <td>Product Name</td>
                                            <td>Quantity</td>
                                            <td>Amount</td>
                                        </tr>
                                      
                                        
                                    </thead>

                                    <tbody>
                                        {data.userproducts.map((text, index) => {
                                            console.log(text)
                                            if (this.state.userdata.uid === text.userid) {
                                            
                                                return (

                                                    <tr style={{ color: 'white', textAlign: 'center' }} key={index}>
                                                        <td >{text.Productname}</td>
                                                        <td >{text.quantity}</td>
                                                        <td >{text.Amount}</td>


                                                    </tr>
                                                )
                                            }
                                           
                                        })}
                                        
                                    </tbody>
                                    
                                </Table>
                            )
                        }}
                    </Query>
                </div>
            </div>
        );
    }
}

export default Purchaselist