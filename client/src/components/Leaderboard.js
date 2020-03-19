import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import logo from '../images/loading.svg';
import { connect } from 'react-redux';
import { Breadcrumb, BreadcrumbItem, Container, Table } from 'reactstrap';
const NavLinkP = {
  color: "#424242",
};

class Achievement extends Component {
  render(){
    if(this.props.auth === false ){
      return(
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
      );
    }
    else {
      return (
        <Container fluid>
          <Breadcrumb>
            <BreadcrumbItem><Link to ="/"><p style={NavLinkP} >Home</p></Link></BreadcrumbItem>
            <BreadcrumbItem active>Leaderboard</BreadcrumbItem>
          </Breadcrumb>
          <Container>
            <Table bordered>
              <thead>
                <tr>
                  <th>Ranking</th>
                  <th>Username</th>
                  <th>Point</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Andrew Tay</td>
                  <td>20</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Zhuan Qi Chew</td>
                  <td>15</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Evelyn Lau</td>
                  <td>10</td>
                </tr>
                <tr>
                  <th scope="row">4</th>
                  <td>Satsheel Shrotriya</td>
                  <td>10</td>
                </tr>
                <tr>
                  <th scope="row">5</th>
                  <td>Wyin 2</td>
                  <td>10</td>
                </tr>
                <tr>
                  <th scope="row">6</th>
                  <td>Boya Yuan</td>
                  <td>5</td>
                </tr>
                <tr>
                  <th scope="row">7</th>
                  <td>Alex Khoo</td>
                  <td>5</td>
                </tr>
              </tbody>
            </Table>
          </Container>
        </Container>
      );
    }
  }
}
function mapStateToProps({ auth }){
  return { auth };
}

export default connect(mapStateToProps)(Achievement);
