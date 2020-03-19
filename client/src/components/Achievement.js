import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import logo from '../images/loading.svg';
import { connect } from 'react-redux';
import { Breadcrumb, BreadcrumbItem, Container,CardColumns, Card,  CardText, CardBody, CardTitle, Progress } from 'reactstrap';
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
            <BreadcrumbItem active>Achievement</BreadcrumbItem>
          </Breadcrumb>
          <Container>
            <h5>You have 0 point(s).</h5>
            <CardColumns>
              <Card body inverse color="secondary">
                  <CardBody>
                  <CardTitle>Curious (+5 Points)</CardTitle>
                  <CardText>Post 5 questions to unlock this achievement.</CardText>
                    <div className="text-center">1/5</div>
                    <Progress value={20} />
                  </CardBody>
              </Card>
              <Card body inverse color="secondary">
                  <CardBody>
                  <CardTitle>Active User (+5 Points)</CardTitle>
                  <CardText>View 100 questions to unlock this achievement.</CardText>
                    <div className="text-center">33/100</div>
                    <Progress value={33} />
                  </CardBody>
              </Card>
              <Card body inverse color="secondary">
                  <CardBody>
                  <CardTitle>Helpful (+15 Points)</CardTitle>
                  <CardText>Share 50 answer to unlock this achievement.</CardText>
                    <div className="text-center">25/50</div>
                    <Progress value={50} />
                  </CardBody>
              </Card>
              <Card body inverse color="secondary">
                  <CardBody>
                  <CardTitle>The Chosen One (+50 Points)</CardTitle>
                  <CardText>5 answers get selected as best answers to unlock this achievement.</CardText>
                    <div className="text-center">2/5</div>
                    <Progress value={40} />
                  </CardBody>
              </Card>
              <Card body inverse color="secondary">
                  <CardBody>
                  <CardTitle>Likable (+50 Points)</CardTitle>
                  <CardText>Get 50 likes on your answers to unlock this achievement.</CardText>
                    <div className="text-center">30/50</div>
                    <Progress value={30} />
                  </CardBody>
              </Card>
              <Card body inverse color="secondary">
                  <CardBody>
                  <CardTitle>Best Question (+50 Points)</CardTitle>
                  <CardText>Get 50 likes on your questions to unlock this achievement.</CardText>
                    <div className="text-center">10/50</div>
                    <Progress value={10} />
                  </CardBody>
              </Card>
            </CardColumns>
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
