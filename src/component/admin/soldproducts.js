import React, { Component } from 'react'
import { Query, } from 'react-apollo';
import gql from 'graphql-tag';
import Admin from './admin';
import{Table} from 'react-bootstrap';


const listofsoldproduct = gql`
{
	userproducts{
    userid
    Productname
    Email
    quantity
    Amount
    
  }
}
`;

class Soldproduct extends Component {
    render() {
        return (
            <div>
                <Admin props={this.props} />
                <Query query={listofsoldproduct}>
                    {({ loading, error, data }) => {
                        if (loading) return "Loading...";
                        if (error) return `Error! ${error.message}`;
                        return(
                            <Table>
                                    <thead>
                                    <tr style={{ color: "#e535ab", textAlign: 'center', fontWeight: 'bold' }}>
                                        <td>Product name</td>
                                        <td>Email</td>
                                        <td>Quantity</td>
                                        <td>Amount</td>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                        data.userproducts.map((text, index) => {

                                            return (
                                                <tr style={{ color: 'white', textAlign: 'center' }} key={index}>
                                                    <td >{text.Productname}</td>
                                                    <td >{text.Email}</td>
                                                    <td>{text.quantity}</td>
                                                    <td>{text.Amount}</td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </Table>
                        );
                    }}


                </Query>
            </div>
        );
    }
}

export default Soldproduct