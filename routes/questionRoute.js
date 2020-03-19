const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const User = mongoose.model('users');
const Question = mongoose.model('questions');

module.exports = app => {

  app.get('/api/questions', async (req, res) => {
    const questions = await Question.find({}).sort({dateCreated: 'desc'});

    res.send(questions)
  });
  app.get('/api/popularquestions', async (req, res) => {
    const questions = await Question.find({}).sort({ downvote: 'asc', views: 'desc',  upvote: 'desc' });

    res.send(questions)
  });
  app.get('/api/activequestions', async (req, res) => {
    const moment = require('moment');
    const today = moment().startOf('day');
    const questions = await Question.find({}).sort({lastResponded: 'desc', dateCreated: 'desc'});

    res.send(questions);
  });
  app.get('/api/unanswered', async (req, res) => {
    const questions = await Question.find({answered: false}).sort({dateCreated: 'desc'});

    res.send(questions);
  });
  app.get('/api/question', async (req, res) => {
    const questions = await Question.findOneAndUpdate({ _id: req.query.qid}, {$inc : {'views' : 1}});
    res.send(questions);
  });

  app.get('/api/myquestions', requireLogin , async (req, res) => {
    const questions = await Question.find({ _byuser: await User.find({ _id: req.user.id }).select('id name')}).sort({dateCreated: 'desc'});

    res.send(questions);
  });
  app.get('/api/deletequestion', requireLogin , async (req, res) => {
    await Question.findByIdAndDelete(req.query.qid);
    const questions = await Question.find({ _byuser: await User.find({ _id: req.user.id }).select('id name')}).sort({dateCreated: 'desc'});
    res.send(questions);
  });
  app.post('/api/questions', requireLogin, async (req, res) => {
    const {title, tags} = req.body;
    const question = await new Question({
      title: title,
      tags: tags,
      _byuser: await User.find({ _id: req.user.id }).select('name'),
      dateCreated: Date.now(),
      lastResponded: Date.now()
    }).save();
    res.send(req.user);
  });
  app.post('/api/answer', requireLogin, async (req, res) => {
    const {qid, body} = req.body;
    const question = await Question.findOneAndUpdate({ _id: qid},{'$push' : {answers : {_byuser: await User.find({ _id: req.user.id }).select('name'), body: body, dateCreated: Date.now()}}, '$inc' : {answerno : 1, views: -1}, '$set':{lastResponded: Date.now()}});
    res.send(req.user);
  });
  app.post('/api/qvote', requireLogin, async (req, res) => {
    const {qid, vote} = req.body;
    var question = null;
    if(vote == 'up'){
      question = await Question.findOneAndUpdate({ _id: qid},{'$addToSet' : {upvotelist : req.user.id},'$pull' : {downvotelist : req.user.id}, '$inc' : {upvote : 1, views: -1}});
    } else if (vote == 'down'){
      question = await Question.findOneAndUpdate({ _id: qid},{'$addToSet' : {downvotelist : req.user.id},'$pull' : {upvotelist : req.user.id},'$inc' : {downvote : 1, views: -1}});
    } else if (vote == 'xup'){
      question = await Question.findOneAndUpdate({ _id: qid},{'$pull' : {upvotelist : req.user.id},'$inc' : {upvote : -1, views: -1}});
    } else if(vote == 'xdown'){
      question = await Question.findOneAndUpdate({ _id: qid},{'$pull' : {downvotelist : req.user.id}, '$inc' : {downvote : -1, views: -1}});
    } else if(vote == 'updown'){
      question = await Question.findOneAndUpdate({ _id: qid},{'$addToSet' : {downvotelist : req.user.id},'$pull' : {upvotelist : req.user.id},'$inc' : {downvote : 1, upvote: -1, views: -1}});
    } else if(vote == 'downup'){
      question = await Question.findOneAndUpdate({ _id: qid},{'$addToSet' : {upvotelist : req.user.id},'$pull' : {downvotelist : req.user.id}, '$inc' : {upvote : 1, downvote: -1, views: -1}});
    }

    res.send(req.user);
  });
  app.post('/api/avote', requireLogin, async (req, res) => {
    const {qid, aid, vote} = req.body;
    var question = null;
    if(vote == 'up'){
      question = await Question.findOneAndUpdate(
        { _id: qid, 'answers._id': aid},
        {
            '$addToSet' : {'answers.$.upvotelist' : req.user.id
            },
            '$pull' : {'answers.$.downvotelist' : req.user.id
            },
            '$inc' : {'answers.$.upvote': 1, 'views': -1
            }
        }
      );
    } else if (vote == 'down'){
      question = await Question.findOneAndUpdate(
        { _id: qid, 'answers._id': aid},
        {
            '$addToSet' : {'answers.$.downvotelist' : req.user.id
            },
            '$pull' : {'answers.$.upvotelist' : req.user.id
            },
            '$inc' : {'answers.$.downvote': 1, 'views': -1
            }
        }
      );
    } else if (vote == 'xup'){
      question = await Question.findOneAndUpdate(
        { _id: qid, 'answers._id': aid},
        {
            '$pull' : {'answers.$.upvotelist' : req.user.id
            },
            '$inc' : {'answers.$.upvote': -1, 'views': -1
            }
        }
      );
    } else if(vote == 'xdown'){
      question = await Question.findOneAndUpdate(
        { _id: qid, 'answers._id': aid},
        {
            '$pull' : {'answers.$.downvotelist' : req.user.id
            },
            '$inc' : {'answers.$.downvote': -1, 'views': -1
            }
        }
      );
    } else if(vote == 'updown'){
      question = await Question.findOneAndUpdate(
        { _id: qid, 'answers._id': aid},
        {
            '$addToSet' : {'answers.$.downvotelist' : req.user.id
            },
            '$pull' : {'answers.$.upvotelist' : req.user.id
            },
            '$inc' : {'answers.$.downvote': 1, 'answers.$.upvote': -1, 'views': -1
            }
        }
      );
    } else if(vote == 'downup'){
      question = await Question.findOneAndUpdate(
        { _id: qid, 'answers._id': aid},
        {
            '$addToSet' : {'answers.$.upvotelist' : req.user.id
            },
            '$pull' : {'answers.$.downvotelist' : req.user.id
            },
            '$inc' : {'answers.$.upvote': 1, 'answers.$.downvote': -1, 'views': -1
            }
        }
      );
    }

    res.send(req.user);
  });
  app.post('/api/selectBestAnswer', requireLogin, async (req, res) => {
    const {qid, aid} = req.body;
    const question = await Question.findOneAndUpdate({ _id: qid }, {'$set': {selectedanswer: aid, answered:true}});
    res.send(req.user);
  });
};
