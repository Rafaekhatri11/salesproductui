import React, { Component } from 'react';
import Auth from './component/auth';
import ApolloClient from "apollo-boost";
// import gql from 'graphql-tag';
import { ApolloProvider } from "react-apollo";
// import {Query} from "react-apollo";
import Productlist from './component/user/productlist';
import Purchaselist from './component/user/purchaselist';
import Userside from './component/user/product';
import Userlist from './component/admin/adminusers';
import Soldproduct from './component/admin/soldproducts';
import AdminProductlist from './component/admin/adminprolist';
import { BrowserRouter as Router, Route } from 'react-router-dom';
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
})

// client
//   .query({
//     query: gql`
//       {
//         signin(Email : "rafae@a.com" , Pass: "123456"){
//           id
//           Email
//           Pass
//           Name
//         }
//       }
//   `
//   }).then(result => console.log(result));

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <Router >
            <div>
               <Route path="/" component={Auth} exact/>
                <Route path="/Purchaselist" component={Purchaselist} />
                <Route path="/Productlist" component={Productlist}/>
                <Route path="/navbar" component={Userside} />
                <Route path="/adminproductlist" component={AdminProductlist} />
                <Route path="/adminuser" component={Userlist} />
                <Route path="/adminsoldproduct" component={Soldproduct}/>
            </div>
          </Router>
        </div>
      </ApolloProvider>

    );
  }
}


export default App;

// const Querycomp = () => (
//   <Query
//      query={
//          gql`
//              {
//                  signin(Email:"rafae@a.com",Pass:"123456"){
//                      id
//                      Name
//                      Email
//                      Pass
//                  }
//              }
//          `
//      }
//  >
//  {({loading , error , data}) =>{
//      if(loading) return <p>Loading...</p>;
//      if(error) return <p>Error :(</p>;



//         return <div><p>{data.signin.Name}</p></div>
//  }}

//  </Query>
// );
