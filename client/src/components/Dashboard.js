import React, { Component } from 'react';
import {
  Nav, NavItem, NavLink
} from 'reactstrap';
import QuestionList from './question/QuestionList'
import classnames from 'classnames';
import { StickyContainer, Sticky } from 'react-sticky';
import '../components/App.css';
//css for secondary nav bar
const NavLinkP = {
  marginTop: "0.5rem",
  fontSize: "0.95rem",
}
const NavLinkPActive = {
  marginTop: "0.5rem",
  fontSize: "0.95rem",
  color: "#263238"
}
const ScrollMenu = {
  overflowX: "auto",
  overflowY: "hidden",
  flexWrap: "nowrap",
  backgroundColor: "#4f5b62"
}
//css end
class Dashboard extends Component {

  render() {
    return (
          <StickyContainer>
          <Sticky>
          {({
            style,
            // the following are also available but unused in this example
            isSticky,
            wasSticky,
            distanceFromTop,
            distanceFromBottom,
            calculatedHeight
          }) => (
            <header className="Nav-header" style={style}><Nav tabs style={ScrollMenu} hidden={this.props.hidden}>
            <NavItem><NavLink className={classnames({ active: this.props.activeTab === '1' })}
              onClick={() => { this.props.onChange('1'); }}><p style={this.props.activeTab === '1' ? NavLinkPActive : NavLinkP} >All</p></NavLink></NavItem>
            <NavItem><NavLink className={classnames({ active: this.props.activeTab === '2' })}
              onClick={() => { this.props.onChange('2'); }}><p style={this.props.activeTab === '2' ? NavLinkPActive : NavLinkP} >Active</p></NavLink></NavItem>
              <NavItem><NavLink className={classnames({ active: this.props.activeTab === '3' })}
                onClick={() => { this.props.onChange('3'); }}><p style={this.props.activeTab === '3' ? NavLinkPActive : NavLinkP} >Popular</p></NavLink></NavItem>
            <NavItem><NavLink className={classnames({ active: this.props.activeTab === '4' })}
              onClick={() => { this.props.onChange('4'); }}><p style={this.props.activeTab === '4' ? NavLinkPActive : NavLinkP} >Unanswered</p></NavLink></NavItem>
            <NavItem><NavLink className={classnames({ active: this.props.activeTab === '5' })}
              onClick={() => { this.props.onChange('5'); }}><p style={this.props.activeTab === '5' ? NavLinkPActive : NavLinkP} >MyQuestion</p></NavLink></NavItem>

          </Nav></header>
          )}
        </Sticky>
           <QuestionList queryMode={this.props.queryMode} />
        </StickyContainer>

    );
  }
}


export default Dashboard;
