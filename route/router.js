import express from 'express';
import {myDB} from '../database/MyDB.js';
import path from 'path';
const __dirname = path.resolve();
const router = express.Router();
//get all professors
router.get('/profs', async (req, res) => {
    console.log('received profs request')
    const profs = await myDB.getProfs();
    res.json(profs);
});
//display home page
router.get('/', (req, res) => {
    res.sendFile(__dirname + '/frontend/home.html');
});
//display add professor page
router.get('/addProf', (req, res) => {
    res.sendFile(__dirname + '/frontend/addProf.html');
});
//add professor
router.post("/addProf", async (req, res) => {
    const name = req.body.name;
    const courseArray  =  req.body.courseArray;
    console.log(courseArray);
    await myDB.addProf(name, courseArray);
    res.status(201).send("Form data submitted successfully!");
});
//get professor's info
router.get('/comments/:profId', async (req, res) => {
    const profId = req.params.profId;
    const id = profId.split(':')[1];
    const data = await myDB.getProfById(id);
    console.log(data);
    res.json(data);

});
//display professor's page
router.get('/comments/:profId/display', (req, res) => {
    res.sendFile(__dirname + '/frontend/profPage.html');
});
//add comment to professor
router.post ('/comments/:profId', async(req, res) => {
    const score = req.body.score;
    const comment  =  req.body.comment;
    const pid = req.body.pid;
    console.log(score);
    console.log(comment);
    console.log(pid);
    await myDB.addComment(score, comment, pid);
    res.json({ message: 'Form data successfully processed!' });
});

router.get('/getComments/:profId', async (req, res) => {
    const profId = req.params.profId;
    const id = profId.split(':')[1];
    console.log(id);
    const data = await myDB.getCommentsByPid(id);
    console.log(data);
    res.json(data);
});

export default router;
