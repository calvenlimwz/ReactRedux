import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from './Header';
import Aboutus from './Aboutus';
import Landing from './Landing';
import Dashboard from './Dashboard';
import QuestionNew from './question/QuestionNew';
import Profile from './Profile';
import Post from './Post';
import Leaderboard from './Leaderboard';
import Achievement from './Achievement';
import { FETCH_QUESTIONS, FETCH_MYQUESTIONS, FETCH_UNANSWERED, FETCH_ACTIVEQUESTIONS, FETCH_POPULARQUESTIONS } from '../actions/types';

class App extends Component {
  constructor(props) {
     super(props);
     this.toggle = this.toggle.bind(this);
     this.state = {
       activeTab: '1',
       queryMode: FETCH_QUESTIONS
     };
   }
   toggle(tab) {
     if (this.state.activeTab !== tab) {
       this.setState({
         activeTab: tab
       });
       switch(tab){
         case '1':
           this.setState({
             queryMode: FETCH_QUESTIONS
           });
           break;
        case '2':
          this.setState({
            queryMode: FETCH_ACTIVEQUESTIONS
          });
          break;
      case '3':
        this.setState({
          queryMode: FETCH_POPULARQUESTIONS
        });
        break;
        case '4':
          this.setState({
            queryMode: FETCH_UNANSWERED
          });
           break;
         case '5':
           this.setState({
             queryMode: FETCH_MYQUESTIONS
           });
           break;
         default:
           this.setState({
             queryMode: FETCH_QUESTIONS
           });
       }
    }
   }
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div style={{fontFamily: 'Roboto',backgroundColor:'#F5F5F6',height: "100vh"}}>
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/questions"  render={()=> < Dashboard onChange={this.toggle} activeTab={this.state.activeTab} queryMode={this.state.queryMode} />}  />
            <Route exact path="/aboutus" component={Aboutus} />
            <Route exact path="/add" render={()=> <QuestionNew />} />
            <Route exact path="/questions/:qid" render={()=> <Post />} />
            <Route path="/profile" component={Profile} />
            <Route path="/achievement" component={Achievement} />
            <Route path="/leaderboard" component={Leaderboard} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
