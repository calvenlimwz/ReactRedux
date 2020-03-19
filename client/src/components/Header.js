import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import { Collapse, Button, Navbar, NavbarToggler, Nav, NavItem, InputGroup, Input,InputGroupAddon, InputGroupText, Badge, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import logo from '../images/logo.png';

const LinkCSS = {
  display: "block",
  padding: "0rem 0.5rem",
  marginTop: "10px",
  fontSize: "1.0rem"
}
const BtnLinkCSS = {
  display: "block",
  padding: "0.2rem 0.5rem"
}
const BtnNotification = {
  padding: "0",
  backgroundColor: "transparent",
  borderColor: "transparent",
  lineHeight: 0
}
class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleMobile = this.toggleMobile.bind(this);
    this.toggleNotification = this.toggleNotification.bind(this);
    this.state = {
      isOpen: false,
      dropdownOpen: false
    };
  }
  toggleMobile(){
    if(this.state.isOpen){
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  toggleNotification() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  renderNotification(){
    return (
      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggleNotification}>
        <DropdownToggle style={BtnNotification} >
          {this.props.auth? <Badge color="danger">2 </Badge>:<Badge color="danger">0 </Badge>} Inbox
        </DropdownToggle>
        {this.props.auth &&
        <DropdownMenu>
          <DropdownItem><b>Andrew Tay</b> posted an answer in <b>Sample question.</b></DropdownItem>
          <DropdownItem divider />
          <DropdownItem><b>Andrew Tay</b> selected your answer as best answer in <b>Sample question.</b></DropdownItem>
        </DropdownMenu>}
      </ButtonDropdown>
    );
  }
  render() {
    return (
        <div>
         <Navbar color="dark" expand="md">
          <Link to={this.props.auth ? '/questions' : '/'}
           className="left brand-logo" onClick={this.toggleMobile}>
          <img src={logo}  style={{height:"70px",width:"180px"}} alt="logo" />
           </Link>
          <NavbarToggler onClick={this.toggle} className="mr-2">&#9776;</NavbarToggler>
          <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
          <NavItem><Link to="#" style={LinkCSS}>{this.renderNotification()}</Link></NavItem>
          <NavItem><Link to={this.props.auth ? "/achievement" : "/profile"} style={LinkCSS} onClick={this.toggleMobile}>Achievement</Link></NavItem>
          <NavItem><Link to={this.props.auth ? "/leaderboard" : "/profile"} style={LinkCSS} onClick={this.toggleMobile}>Leaderboard</Link></NavItem>
          <NavItem><Link to="/profile" style={LinkCSS} onClick={this.toggleMobile}>Profile</Link></NavItem>
          <NavItem><Link to="/aboutus" style={LinkCSS} onClick={this.toggleMobile}>About Us</Link></NavItem>
          <NavItem style={BtnLinkCSS}>
            <InputGroup>
            <InputGroupAddon addonType="prepend">
            <InputGroupText><i className="fa fa-search"></i></InputGroupText>
            </InputGroupAddon>
              <Input placeholder="Search" />
            </InputGroup>
          </NavItem>
          <NavItem><Link to={this.props.auth ? "/add" : "/profile"} style={BtnLinkCSS} onClick={this.toggleMobile}><Button style={{backgroundColor:"#6a1b9a"}}>Add Question</Button></Link></NavItem>
          </Nav>
          </Collapse>
          </Navbar>
        </div>
    );
  }
}

function mapStateToProps({ auth }){
  return { auth };
}

export default connect(mapStateToProps)(Header);
