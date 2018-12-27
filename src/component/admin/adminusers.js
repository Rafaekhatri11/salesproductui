import React, { Component } from 'react'
import gql from "graphql-tag";
import { Query, compose, graphql, } from "react-apollo";
import Admin from './admin';
import{Table,Button} from 'react-bootstrap';


const Allusers = gql`
  {
    listofalluser{
        id
        Name
        Email
        Pass
      }
  }
`

const deleteuser = gql`
mutation($id:ID!){
    deleteuser(id: $id){
        id
        Name
        Email
        Pass
      }
}
  
`

class Userlist extends Component {

    deleteuser(evt){
        console.log(evt.id);
        this.props.deleteuserfromadmin({
            variables:{
                id: evt.id
            },
            refetchQueries: [{ query: Allusers }]
        })
    }
    render() {
        return (
            <div>
                <Admin props={this.props}/>

                <Query query={Allusers}>
                    {({ loading, error, data, }) => {
                        if (loading) return "Loading...";
                        if (error) return `Error! ${error.message}`;
                        return (
                            <Table>
                                <thead>
                                    <tr style={{ color: "#e535ab", textAlign: 'center', fontWeight: 'bold' }}>
                                        <td>Name</td>
                                        <td>Email</td>
                                        <td>Password</td>
                                        <td>Delete User</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.listofalluser.map((text, index) => {

                                            return (
                                                <tr style={{ color: 'white', textAlign: 'center' }} key={text.id}>
                                                    <td >{text.Name}</td>
                                                    <td >{text.Email}</td>
                                                    <td>{text.Pass}</td>
                                                    <td><Button onClick={()=>this.deleteuser(text)} bsStyle="danger">Delete</Button></td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </Table>
                        )
                    }}
                </Query>


            </div>
        );
    }
}

export default compose(
    graphql(deleteuser,{ name:"deleteuserfromadmin"}),
)
(Userlist)