import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Container, Input, Row, Col, Label, FormGroup, Card, CardBody, CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap';
const NavLinkP = {
  color: "#424242",
};

class Profile extends Component {
  renderContent() {
    switch (this.props.auth){
      case null:
        return;

      case false:
        return (
         <div>
         <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
             <Card>
               <CardBody>
                 <CardTitle>Sign In</CardTitle>
                 <form>
                   <FormGroup>
                     <Label>Email address</Label>
                     <Input type="email" id="inputEmail" placeholder="abc@hotmail.com" required autoFocus />
                   </FormGroup>
                   <FormGroup>
                     <Label>Password</Label>
                     <Input type="password" id="inputPassword" required />
                   </FormGroup>
                   <FormGroup check>
                     <Label check>
                     <Input type="checkbox" />{' '}
                     Remember password
                   </Label>
                   </FormGroup>
                   <hr/>
                   <Button color="primary" type="submit">Sign in</Button>{' '}
                   <Button color="danger" type="submit" href="/auth/google">Sign in with Google</Button>
                   </form>
                 </CardBody>
               </Card>
             </Col>
         </Row>
         </div>
        );

      default:
        return (
          <header className= "App-header">
          <Button size="lg" href="/api/logout">Logout</Button >
          </header>
        );
    }
  }

  render() {
    return(
      <div>
        <Breadcrumb>
          <BreadcrumbItem><Link to="/"><p style={NavLinkP} >Home</p></Link></BreadcrumbItem>
          <BreadcrumbItem active>Profile</BreadcrumbItem>
        </Breadcrumb>
        <Container fluid>
          {this.renderContent()}
        </Container>
      </div>
    );
  }
}

function mapStateToProps({ auth }){
  return { auth };
}

export default connect(mapStateToProps)(Profile);
