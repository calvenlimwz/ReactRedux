import React, { Component } from 'react';
import background from '../images/sglandscape.jpg';
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Jumbotron, Button, Container} from 'reactstrap';

const img= {
  width: "100%",
  height: "100vh",
  backgroundImage: `url(${background})`,
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat'
}
const copyright = {
  position:'absolute',
  bottom: 0,
  color: 'WHITE',
  right: 10
}
class Landing extends Component {
  render() {
    return(
      <Container fluid style={ img }>
        <Jumbotron style={{backgroundColor: 'rgba(255, 255, 255, 0.6)'}}>
          <img src={logo} style={{height:"70px",width:"180px"}} className="App-logo-landing App" alt="logo" />
          <p className="lead">Temasek is a global investment management firm, with 700+ world-class professionals, across 11 offices across the world. As Temasek becomes (even) more global, our colleagues are increasingly looking to leverage the depth & breadth of perspectives, to bring "the best of Temasek" to every opportunity, to each challenge. Hence, how should we enable all Temasek staff to efficiently crowdsource ideas, insights and differing perspectives?
TQx  is a global Temasek-only crowdsourcing platform to post questions and get responses/feedback from all Temasek staff.</p>
          <h5>TQ<sup>x</sup> ["<b>T</b>emasek <b>Q</b>uotient raised to the power <b>X</b>" signifying the power of collaboration within the Firm.]</h5>
          <hr className="my-1" />
          <Link to={this.props.auth ? '/questions' : '/profile'}><Button className="pull-right" color="secondary" size="lg">Get started</Button></Link>

          <p>All Rights Reserved © TQ<sup>x</sup> - December 2018 CEO Innovation Challenge</p>
        </Jumbotron>
      </Container>
    );
  }
}

function mapStateToProps({ auth }){
  return { auth };
}
export default connect(mapStateToProps)(Landing);
