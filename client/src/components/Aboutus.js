import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, Row, Container, Col, Card, CardImg, CardText, CardBody,
  CardTitle } from 'reactstrap';
import pic_community from '../images/aboutus_community.png';
import pic_trust from '../images/aboutus_trust.png';
import pic_post from '../images/aboutus_post.png';
const NavLinkP = {
  color: "#424242",
};

const Aboutus =() => {
  return (
    <Container fluid>
      <Breadcrumb>
        <BreadcrumbItem><Link to ="/"><p style={NavLinkP} >Home</p></Link></BreadcrumbItem>
        <BreadcrumbItem active>About us</BreadcrumbItem>
      </Breadcrumb>
      <Container>
      <Row>
          <Col sm="4">
          <Card body outline color="white">
            <CardImg top width="100%" src={pic_community} alt="comunity" />
              <CardBody>
              <CardTitle>Our Communities</CardTitle>
              <CardText>Share knowledge & build communities by Temasek for Temasek with Temasek.</CardText>
              </CardBody>
          </Card>
          </Col>
          <Col sm="4">
          <Card body outline color="white">
            <CardImg top width="100%" src={pic_post} alt="post" />
              <CardBody>
              <CardTitle>Our Posts</CardTitle>
              <CardText>Anyone can vote on posts, so that answers are easy to find.</CardText>
              </CardBody>
          </Card>
          </Col>
          <Col sm="4">
          <Card body outline color="white">
            <CardImg top width="100%" src={pic_trust} alt="trust" />
              <CardBody>
              <CardTitle>Earn Reputation</CardTitle>
              <CardText>For post that earn sufficient votes, you may well become an expert with moderation rights.</CardText>
              </CardBody>
          </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Aboutus;
