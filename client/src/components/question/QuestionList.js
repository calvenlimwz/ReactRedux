import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { fetchQuestions, deleteQuestion } from '../../actions';
import { FETCH_QUESTIONS, FETCH_MYQUESTIONS} from '../../actions/types';
import { Container, Card, CardHeader, CardText, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import logo from '../../images/loading.svg';
import '../../components/App.css';
var moment = require('moment');

class QuestionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryMode: FETCH_QUESTIONS,
      loading: true,
      modal: false,
      selectedQid : "",
      selectedTitle: ""
    };

    this.toggle = this.toggle.bind(this);
    this.setActiveQuestion = this.setActiveQuestion.bind(this);
  }

  componentDidMount() {
    this.props.fetchQuestions(this.props.queryMode).then( () => {this.setState({loading:false})});
    this.setState({loading:true, queryMode: this.props.queryMode});
  }
  componentDidUpdate(prevProps, prevState) {
  // Typical usage (don't forget to compare props):
  if (this.props.queryMode !== prevProps.queryMode) {
   this.props.fetchQuestions(this.props.queryMode).then( () => {this.setState({loading:false})});
   this.setState({loading:true, queryMode: this.props.queryMode});
  }
  return false;
  }
  onClickDelete (qid) {
    this.props.deleteQuestion(qid);
   this.toggle();
  }
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  setActiveQuestion(qid,qtitle){
    this.setState({
      selectedQid: qid,
      selectedTitle: qtitle
    });
    this.toggle();
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
  renderPreviewAnswer(question){
    if(question.answered){
      const index=question.answers.findIndex((a) => (a._id === question.selectedanswer));
      if(question.answers[index].body.length>200){
        return(
          <div>
          <h6><CardText className="text-left"><i>Best Answer by <b>{question.answers[index]._byuser[0].name}</b></i></CardText></h6>
          <CardText className="text-left">{question.answers[index].body.substring(0,200)}..</CardText>
          </div>
       );
      } else {
        return(
          <div>
          <h6><CardText className="text-left"><i>Best Answer by <b>{question.answers[index]._byuser[0].name}</b></i></CardText></h6>
          <CardText className="text-left">{question.answers[index].body}</CardText>
          </div>

        );
      }
    } else {
      return(
          <CardText className="text-left">No answer yet</CardText>
      );
    }


  }
  renderMyQuestions(question){
      return(
        <CardText className="text-right">
          <Button onClick={() => this.setActiveQuestion(question._id, question.title)} color="danger">Delete</Button>{' '}
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>Delete Question</ModalHeader>
            <ModalBody>
              <p>{this.state.selectedTitle}</p>
              <p>Are you sure you want to delete this question ?</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={() => this.onClickDelete(this.state.selectedQid)}>Confirm</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
      </CardText>
    )
  }
  renderQuestions(){
    if(this.props.questions.length > 0) {
      return this.props.questions.map(question => {
        return(
        <div key={question._id}>
          <CardHeader style={{ backgroundColor:"#12005e",color:'WHITE', marginTop: '3px' }} ><h4><b>{question.title}</b></h4></CardHeader>
          <Card body>
            <Row>
                <Col sm="8">
                  <h5><CardText className="text-left"><i>Asked by <b>{question._byuser[0].name}</b> {this.getDateDiff(new Date(question.dateCreated))}</i></CardText></h5>
                  <hr/>
                    {this.renderPreviewAnswer(question)}
                  <br/>
                  <CardText className="text-right"><Link to={"/questions/"+question._id}><Button style={{backgroundColor:"#6a1b9a"}}>View</Button></Link></CardText>
                  {this.state.queryMode === FETCH_MYQUESTIONS && <div>
                  {this.renderMyQuestions(question)}
                  </div>}
                </Col>
                <Col sm="4">
                    <CardText><b>Posted</b><br/>{new Date(question.dateCreated).toLocaleString()}</CardText>
                    <CardText><b>Last responded</b><br/>{new Date(question.lastResponded || question.dateCreated).toLocaleString()}</CardText>
                    <CardText><b>Views</b><br/>{question.views}</CardText>
                    <CardText><b>{question.tags}</b></CardText>
                    <h4>
                      <i className="fa fa-thumbs-up" style={{color: "LIGHTSKYBLUE"}}></i> {question.upvote} &nbsp;&nbsp;
                      <i className="fa fa-thumbs-down" style={{color:"LIGHTCORAL"}}></i> {question.downvote} &nbsp;&nbsp;
                      <i className="fa fa-comment" style={{color:"DARKVIOLET"}}></i> {question.answerno}
                    </h4>
                </Col>
              </Row>
            </Card>
          </div>
        );
      });
    } else {
      return (
        <header className="App">
          <br/><br/><br/>
          <h2><i>No question to display</i></h2>
        </header>
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
      <Container> {this.renderQuestions()} </Container>
    );
  }
}

function mapStateToProps({ questions }) {
  return { questions };
}

export default connect(mapStateToProps, { fetchQuestions, deleteQuestion })(withRouter(QuestionList));
