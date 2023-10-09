import express from 'express';
import {myDB} from '../database/MyDB.js';

const router = express.Router();

router.get('/profs', async (req, res) => {
    console.log('received profs request')
    const profs = await myDB.getProfs();
    res.json(profs);
});
router.get('/', (req, res) => {
    res.send('hello index');
});

router.post("/addProf", async (req, res) => {
    const name = req.body.name;
    const courseArray  =  req.body.courseArray;
    console.log(courseArray);
    await myDB.addProf(name, courseArray);
    res.status(201).send("Form data submitted successfully!");
});
export default router;
