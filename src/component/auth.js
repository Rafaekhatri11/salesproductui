import React, { Component } from 'react';
import { Row, Col, Nav, NavItem, Tab, FormControl, Button, Image } from 'react-bootstrap';
import axios from 'axios';
// import gql from 'graphql-tag';


// const signup = gql`
//         mutation Signup($Name:String!,$Email:String!,$Pass: ID!){
//             signup(Name:$Name,Email:$Email,Pass:$Pass){
//                 id
//                 Name
//                 Email
//                 Pass
//             }
//         }
// `
class Auth extends Component {
    constructor() {
        super();
        this.state = {
            registerName: "",
            registerUsername: "",
            registerPassword: "",
            loginUsername: "",
            loginPass: ""
        }
    }


    register(evt) {
        evt.preventDefault();
        console.log(this.state);
        if (this.state.registerName === "" || this.state.registerUsername === "" || this.state.registerPassword === "") {
            alert('Please fill all the fields');
        }

        else {
            const user = {
                Name: this.state.registerName,
                Email: this.state.registerUsername,
                Pass: this.state.registerPassword
            }
            const json = JSON.stringify(user);
            axios.post('http://localhost:4000/user/signup', { json }).then(res => {
                console.log(res);
                alert(res.data.message);
                if(res.data.token){
                    this.setState({
                        registerName: "",
                        registerUsername: "",
                        registerPassword: "",
                    })
                    localStorage.setItem('userdata', JSON.stringify(res.data));
                    this.props.history.push('/Productlist');
            }
                else{
                    alert(res.data.message);
                }
            })
        }

    }

    login(evt) {
        evt.preventDefault();
        console.log(this.state);
        const user = {
            Email: this.state.loginUsername,
            Pass: this.state.loginPass
        }
        if (this.state.loginUsername === "admin@a.com") {
            console.log("admin");
            const json = JSON.stringify(user);
            axios.post('http://localhost:4000/user/adminlogin',{json}).then(res =>{
                console.log(res);
                localStorage.setItem('admindata',JSON.stringify(res.data));
                this.props.history.push('/adminproductlist');
            })

        }
        else {

            const json = JSON.stringify(user);
            axios.post('http://localhost:4000/user/login', { json }).then(res => {
                console.log(res);
                if(res.data.token){
                localStorage.setItem('userdata', JSON.stringify(res.data));
                this.props.history.push('/Productlist');
                }

                else{
                    alert(res.data.message);
                }
                
            })
                .catch(err => {
                    console.log(err)
                })



        }
        // signup({variables:{Name: this.state.registerName,Email:this.state.registerUsername,Pass:this.state.registerPassword}})
    }

    render() {
        return (
            <div >
                <div style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>

                    <div><Image src={require('./graphql.png')} width="200" height="100" /></div>
                    <h1 style={{ color: 'white', textAlign: 'center', width: '100%', marginLeft: -200 }}>Sales System with Graphql</h1>
                </div>
                <div>
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                        <Row className="clearfix" style={{ paddingTop: '5%' }}>
                            <Col style={{ justifyContent: 'center', display: 'inline-flex', width: '100%', alignItems: 'center' }}>
                                <Nav style={{ display: 'inline-flex', width: '50%', }} bsStyle="pills" stacked>
                                    <NavItem style={{ width: '50%' }} eventKey="first">Log In</NavItem>
                                    <NavItem style={{ width: '50%', }} eventKey="second">Register</NavItem>
                                </Nav>
                            </Col>
                            <Col style={{ justifyContent: 'center', display: 'inline-flex', width: '100%', alignItems: 'center' }}>
                                <Tab.Content animation>
                                    <Tab.Pane eventKey="first">

                                        <form onSubmit={(evt) => this.login(evt)} style={{ display: "block", height: 200, paddingTop: 30 }}>
                                            <div>
                                                <FormControl
                                                    type="email"
                                                    placeholder="Enter text"
                                                    onChange={(evt) => this.setState({ loginUsername: evt.target.value })}
                                                    value={this.state.loginUsername}
                                                /> <br />
                                                <FormControl
                                                    type="password"
                                                    placeholder="Password"
                                                    onChange={(evt) => this.setState({ loginPass: evt.target.value })}
                                                    value={this.state.loginPass}
                                                /><br />
                                            </div>
                                            <Button type="submit" bsStyle="primary" style={{ marginLeft: 50 }} >
                                                Log In
                                                </Button>
                                        </form>

                                    </Tab.Pane>
                                    <Tab.Pane eventKey="second">

                                        <div>
                                            <form onSubmit={
                                                (evt) => this.register(evt)
                                            }
                                                style={{ display: "block", height: 200, paddingTop: 30 }}>
                                                <div>
                                                    <FormControl
                                                        type="text"
                                                        placeholder="Name"
                                                        onChange={(evt) => this.setState({ registerName: evt.target.value })}
                                                        value={this.state.registerName}
                                                    /><br />
                                                    <FormControl
                                                        type="email"
                                                        placeholder="Username"
                                                        onChange={(evt) => this.setState({ registerUsername: evt.target.value })}
                                                        value={this.state.registerUsername}
                                                    /> <br />
                                                    <FormControl
                                                        type="password"
                                                        placeholder="Password"
                                                        onChange={(evt) => this.setState({ registerPassword: evt.target.value })}
                                                        value={this.state.registerPassword}

                                                    /><br />
                                                </div>
                                                <Button bsStyle="primary" style={{ marginLeft: 50 }} type="submit">
                                                    Register
                                                </Button>
                                            </form>
                                        </div>

                                    </Tab.Pane>

                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>;
                </div>
            </div >
        );
    }
}

export default Auth;