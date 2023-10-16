import express from 'express';
import {myDB} from '../database/MyDB.js';
import path from 'path';
const __dirname = path.resolve();
// eslint-disable-next-line new-cap
const router = express.Router();

// ---- display ---- 
// display home page 
// It might be possible to split the Adding Professor Functionality section and the Rating Professors section into two distinct routes.
router.get('/', (req, res) => {
  res.sendFile(__dirname + '/frontend/home.html');
});
// display add professor page
router.get('/addProf', (req, res) => {
  res.sendFile(__dirname + '/frontend/addProf.html');
});
// display professor's page
router.get('/comments/:profId/display', (req, res) => {
  res.sendFile(__dirname + '/frontend/profPage.html');
});

// ---- getters ----
// get all professors
router.get('/profs', async (req, res) => {
  const profs = await myDB.getProfs();
  res.json(profs);
});
// get professor's info
router.get('/comments/:profId', async (req, res) => {
  const profId = req.params.profId;
  const id = profId.split(':')[1];
  const data = await myDB.getProfById(id);
  res.json(data);
});
// get comments by professor id
router.get('/getComments/:profId', async (req, res) => {
  const profId = req.params.profId;
  const id = profId.split(':')[1];
  const data = await myDB.getCommentsByPid(id);
  res.json(data);
});

// ---- post ----
// add professor
router.post('/addProf', async (req, res) => {
  const name = req.body.name;
  const courseArray = req.body.courseArray;
  await myDB.addProf(name, courseArray);
  res.json({message: 'Form data successfully processed!'});
});
// add comment to professor
router.post('/comments/:profId', async (req, res) => {
  const score = req.body.score;
  const comment = req.body.comment;
  const pid = req.body.pid;
  await myDB.addComment(score, comment, pid);
  res.json({message: 'Form data successfully processed!'});
});
// delete comments
router.delete('/comments/:profId/:commentId', async (req, res) => {
  const commentId = req.params.commentId;
  await myDB.deleteComment(commentId);
  res.json({message: ' data successfully deleted!'});
});
// update score for professor
router.put('/updateScore/:profId', async (req, res) => {
  const profId = req.params.profId;
  const id = profId.split(':')[1];
  const avgScore = req.body.avgScore;
  await myDB.updateScore(id, avgScore);
  res.json({message: 'Score updated!'});
});
export default router;
