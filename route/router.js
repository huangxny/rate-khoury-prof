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


export default router;
