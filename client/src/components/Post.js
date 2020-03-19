import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchQuestion, submitAnswer, likeQuestion, likeAnswer, selectBestAnswer} from '../actions';
import { withRouter, Link } from 'react-router-dom';
import logo from '../images/loading.svg';
import '../components/App.css';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Collapse, Container, Card, CardHeader, CardText, Button, Row, Col, Form, Input} from 'reactstrap';
var moment = require('moment');

class Post extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.toggleDropDownBtn = this.toggleDropDownBtn.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      loading: true,
      dropdownOpen: false,
      selectedAid: '',
      collapse: false,
      value: '',
      buttonAnsChanged:[],
      buttonChanged:false,
      qlikeno: 0,
      qdislikeno: 0,
      qstateLike: false,
      qstateDislike: false,
      alikeno: [],
      adislikeno: [],
      astateLike: [],
      astateDislike: []
    };
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    this.onAnswerRadioBtnClick = this.onAnswerRadioBtnClick.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleClick(){
    this.props.submitAnswer(this.props.match.params.qid, this.state.value);
    this.toggle();
  }
  onRadioBtnClick(rSelected, qid) {
    if(!this.state.buttonChanged){
    this.setState({buttonChanged: true});
    const liked = String(this.props.questions.upvotelist).indexOf(this.props.auth._id)!==-1;
    const disliked = String(this.props.questions.downvotelist).indexOf(this.props.auth._id)!==-1;
      if (rSelected === 1 && !liked && !disliked) {
        this.props.likeQuestion(qid, 'up', this.props.history);
          this.setState({qlikeno: this.state.qlikeno+1, qstateLike: true});
      } else if (rSelected === 2 && !liked && !disliked) {
        this.props.likeQuestion(qid, 'down', this.props.history);
        this.setState({qdislikeno: this.state.qdislikeno+1, qstateDislike: true});
      } else if (rSelected === 1 && !liked && disliked) {
        this.props.likeQuestion(qid, 'downup', this.props.history);
        this.setState({qlikeno: this.state.qlikeno+1, qdislikeno: this.state.qdislikeno-1, qstateLike: true, qstateDislike: false});
      } else if (rSelected === 2 && liked && !disliked) {
        this.props.likeQuestion(qid, 'updown', this.props.history);
        this.setState({qlikeno: this.state.qlikeno-1, qdislikeno: this.state.qdislikeno+1, qstateLike: false, qstateDislike: true});
      } else if (rSelected === 1 && liked && !disliked) {
        this.props.likeQuestion(qid, 'xup', this.props.history);
        this.setState({qlikeno: this.state.qlikeno-1,  qstateLike: false});
      } else if (rSelected === 2 && !liked && disliked) {
        this.props.likeQuestion(qid, 'xdown', this.props.history);
        this.setState({qdislikeno: this.state.qdislikeno-1, qstateDislike: false});
      }
    }
  }
  onAnswerRadioBtnClick(rSelected, aid, index) {
    if(!this.state.buttonAnsChanged[index]){
    var newButtonAnsChanged = this.state.buttonAnsChanged;
    newButtonAnsChanged[index] = true;
    this.setState({buttonAnsChanged: newButtonAnsChanged});
    const liked = String(this.props.questions.answers[index].upvotelist).indexOf(this.props.auth._id)!==-1;
    const disliked = String(this.props.questions.answers[index].downvotelist).indexOf(this.props.auth._id)!==-1;
    var newalikeno = this.state.alikeno;
    var newadislikeno = this.state.adislikeno;
    var newstatealike = this.state.astateLike;
    var newstateadislike = this.state.astateDislike;
      if (rSelected === 1 && !liked && !disliked) {
        this.props.likeAnswer(this.props.questions._id, aid, 'up', this.props.history);
        newalikeno[index] = newalikeno[index]+1;
        newstatealike[index] = true;
        this.setState({alikeno: newalikeno, astateLike: newstatealike});
      } else if (rSelected === 2 && !liked && !disliked) {
        this.props.likeAnswer(this.props.questions._id, aid, 'down', this.props.history);
        newadislikeno[index] = newadislikeno[index]+1;
        newstateadislike[index] = true;
        this.setState({adislikeno: newadislikeno, astateDislike:newstateadislike});
      } else if (rSelected === 1 && !liked && disliked) {
        this.props.likeAnswer(this.props.questions._id, aid, 'downup', this.props.history);
        newalikeno[index] = newalikeno[index]+1;
        newadislikeno[index] = newadislikeno[index]-1;
        newstatealike[index] = true;
        newstateadislike[index] = false;
        this.setState({alikeno: newalikeno, adislikeno: newadislikeno, astateLike: newstatealike, astateDislike:newstateadislike});
      } else if (rSelected === 2 && liked && !disliked) {
        this.props.likeAnswer(this.props.questions._id, aid, 'updown', this.props.history);
        newalikeno[index] = newalikeno[index]-1;
        newadislikeno[index] = newadislikeno[index]+1;
        newstatealike[index] = false;
        newstateadislike[index] = true;
        this.setState({alikeno: newalikeno, adislikeno: newadislikeno, astateLike: newstatealike, astateDislike:newstateadislike});
      } else if (rSelected === 1 && liked && !disliked) {
        this.props.likeAnswer(this.props.questions._id, aid, 'xup', this.props.history);
        newalikeno[index] = newalikeno[index]-1;
        newstatealike[index] = false;
        this.setState({alikeno: newalikeno, astateLike: newstatealike});
      } else if (rSelected === 2 && !liked && disliked) {
        this.props.likeAnswer(this.props.questions._id, aid, 'xdown', this.props.history);
        newadislikeno[index] = newadislikeno[index]-1;
        newstateadislike[index] = false;
        this.setState({adislikeno: newadislikeno, astateDislike:newstateadislike});
      }
    }
  }
  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }
  toggleDropDownBtn(aid){
    this.setState({
      selectedAid: aid,
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  selectBestAnswer(aid){
    this.props.selectBestAnswer(this.props.match.params.qid, aid);
  }
  componentDidMount(){
     this.props.fetchQuestion(this.props.match.params.qid).then( () => {this.setState({
       loading:false,
       qlikeno:this.props.questions.upvote,
       qdislikeno: this.props.questions.downvote,
       qstateLike: String(this.props.questions.upvotelist).indexOf(this.props.auth._id)!==-1,
       qstateDislike: String(this.props.questions.downvotelist).indexOf(this.props.auth._id)!==-1,
       alikeno: this.props.questions.answers.map(a => a.upvote==null ? 0 : a.upvote),
       adislikeno: this.props.questions.answers.map(a => a.downvote==null ? 0 : a.downvote),
       astateLike: this.props.questions.answers.map(a => a.upvotelist==null ? false : String(a.upvotelist).indexOf(this.props.auth._id)!==-1),
       astateDislike: this.props.questions.answers.map(a => a.downvotelist==null ? false : String(a.downvotelist).indexOf(this.props.auth._id)!==-1),
     })});


  }
  componentDidUpdate(prevProps, prevState) {
  // Typical usage (don't forget to compare props):
    if (this.props.auth !== prevProps.auth && this.state.value !== '') {
     this.props.fetchQuestion(this.props.match.params.qid).then(() =>{ this.setState({
       value:'',
       alikeno: this.props.questions.answers.map(a => a.upvote==null ? 0 : a.upvote),
       adislikeno: this.props.questions.answers.map(a => a.downvote==null ? 0 : a.downvote),
       astateLike: this.props.questions.answers.map(a => a.upvotelist==null ? false : String(a.upvotelist).indexOf(this.props.auth._id)!==-1),
       astateDislike: this.props.questions.answers.map(a => a.downvotelist==null ? false : String(a.downvotelist).indexOf(this.props.auth._id)!==-1)
     })});
   } else if (this.props.auth !== prevProps.auth && (this.state.buttonChanged||this.state.buttonAnsChanged.length !== 0)) {
    this.props.fetchQuestion(this.props.match.params.qid).then( () => {this.setState({buttonChanged:false, buttonAnsChanged: this.props.questions.answers.map(a => false)})});
  } else if (this.props.auth !== prevProps.auth && this.state.selectedAid!==''){
    this.props.fetchQuestion(this.props.match.params.qid).then( () => {this.setState({selectedAid:''})});
  }
    return false;
  }
  getDateDiff(date){
    var a = moment(date);
    var b = moment();
    if(b.diff(a, 'months') > 0){
      return b.diff(a, 'months') + ' month(s) ago';
    } else if(b.diff(a, 'days') > 0){
      return b.diff(a, 'days') + ' day(s) ago';
    } else if(b.diff(a, 'hours') > 0){
      return b.diff(a, 'hours') + ' hour(s) ago';
    } else {
      return 'just now';
    }
  }
  renderForm(){
    if(this.props.auth){
      return (
        <div>
        <hr/>
        <Button close aria-label="Cancel" onClick={this.toggle}>
                <span aria-hidden style={{color:"LAVENDER"}}>&ndash;</span>
        </Button>
        <Form>
          <Input type="textarea" value={this.state.value} onChange={this.handleChange} placeholder="Describe your answer.." />
          <hr/>
          <Button className="pull-right" value="Submit" color="success" onClick={() => this.handleClick()}>Submit</Button>
        </Form>
        </div>
      );
    } else {
      return (
        <h3>Please Login First!</h3>
      );
    }
  }
  renderAnswers(){
    return this.props.questions.answers.map((answer, index) => {
      return (
        <Card key={answer._id} body style={{marginTop: '3px' }}>
          <Row>
            <Col>
              {this.props.questions._byuser[0]._id.indexOf(this.props.auth._id)!== -1 &&
                <ButtonDropdown direction="left" className="pull-right"  isOpen={this.state.dropdownOpen && this.state.selectedAid===answer._id} toggle={() => this.toggleDropDownBtn(answer._id)}>
                  <DropdownToggle close>
                    <span aria-hidden="true">&hellip;</span>
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={() => this.selectBestAnswer(answer._id)}>Select as best answer</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
              }
            </Col>
          </Row>
          <Row>
              <Col sm="8">
                <CardText className="text-left"><i>Answered by <b>{answer._byuser[0].name}</b> {this.getDateDiff(new Date(answer.dateCreated))}</i></CardText>
                <CardText className="text-left">{answer.body}</CardText>
                <br/>
              </Col>
              <Col sm="4">
                  <CardText><b>Posted</b><br/> {new Date(answer.dateCreated).toLocaleString()}</CardText>
                  <h4>
                    <Button size="lg" outline color="primary" onClick={() => this.onAnswerRadioBtnClick(1,answer._id, index)} active={this.state.astateLike[index]}><i className="fa fa-thumbs-up" style={{color: "LIGHTSKYBLUE"}} ></i></Button> {this.state.alikeno[index]} &nbsp;&nbsp;
                    <Button size="lg" outline color="danger" onClick={() => this.onAnswerRadioBtnClick(2,answer._id, index)} active={this.state.astateDislike[index]}><i className="fa fa-thumbs-down" style={{color:"LIGHTCORAL"}}></i></Button> {this.state.adislikeno[index]}
                  </h4>
              </Col>
            </Row>
          </Card>
      );
    });
  }
  renderVotes(){
      return (
        <h4>
          <Button size="lg" outline color="primary" onClick={() => this.onRadioBtnClick(1,this.props.questions._id)} active={this.state.qstateLike}><i className="fa fa-thumbs-up" style={{color: "LIGHTSKYBLUE"}} ></i></Button> {this.state.qlikeno} &nbsp;&nbsp;
          <Button size="lg" outline color="danger" onClick={() => this.onRadioBtnClick(2,this.props.questions._id)} active={this.state.qstateDislike}><i className="fa fa-thumbs-down" style={{color:"LIGHTCORAL"}}></i></Button> {this.state.qdislikeno}
        </h4>
      );
  }
  renderPreviewAnswer(){
    if(this.props.questions.answered){
      const index=this.props.questions.answers.findIndex((a) => (a._id === this.props.questions.selectedanswer));
      return(
        <div>
            <h6><CardText className="text-left"><i>Best Answer by <b>{this.props.questions.answers[index]._byuser[0].name}</b> {this.getDateDiff(new Date(this.props.questions.answers[index].dateCreated))}</i></CardText></h6>
            <CardText className="text-left">{this.props.questions.answers[index].body}</CardText>
        </div>
      );
    } else {
      return(
          <h6><CardText className="text-left">No answer yet</CardText></h6>
      );
    }


  }
  render() {
    if (this.state.loading) {
      return (
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
      );
    }
    return(
      <Container fluid>
        <Row>
          <Col><Link to='/questions'><Button color="link">Back to questions</Button></Link></Col>
        </Row>
        <Row>
          <Col sm="8">
            <CardHeader style={{ backgroundColor:"#12005e",color:'WHITE' }} ><h4>{this.props.questions.title}</h4></CardHeader>
            <Card body>
              <h5><CardText className="text-left"><i>Asked by <b>{this.props.questions._byuser[0].name}</b> {this.getDateDiff(new Date(this.props.questions.dateCreated))}</i></CardText></h5>
              <hr/>
              <div>{this.renderPreviewAnswer()}</div>
              <br/>
              <div className="text-right">
                <Button onClick={this.toggle} style={{ marginBottom: '1rem', backgroundColor:"#6a1b9a" }}>Answer</Button>
                  <Collapse isOpen={this.state.collapse}>{this.renderForm()}</Collapse>
              </div>
            </Card>
          </Col>
          <Col sm="4">
            <CardHeader style={{ backgroundColor:"#12005e",color:'WHITE' }}><h4>Information</h4></CardHeader>
            <Card body>
              <CardText><b>Posted</b><br/>{new Date(this.props.questions.dateCreated).toLocaleString()}</CardText>
              <CardText><b>Last Responded</b><br/>{new Date(this.props.questions.lastResponded || this.props.questions.dateCreated).toLocaleString()}</CardText>
              <CardText><b>Views</b><br/>{this.props.questions.views}</CardText>
              <CardText><b>{this.props.questions.tags}</b></CardText>
              {this.renderVotes()}
            </Card>
          </Col>
        </Row>
        <Row>
          <Col sm="8">
            {this.renderAnswers()}
          </Col>
        </Row>
      </Container>
    );
  }

}

function mapStateToProps({ auth, questions, match, history}){
  return { auth, questions, match, history};
}
export default connect(mapStateToProps, { fetchQuestion, submitAnswer, likeQuestion, likeAnswer, selectBestAnswer} )(withRouter(Post));
