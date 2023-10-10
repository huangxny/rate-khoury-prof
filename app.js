import express from 'express';
import router from './route/router.js';
import bodeParser from 'body-parser';
const app = express();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
app.use(bodeParser.json());
app.use(express.json());
app.use(router);
app.use(express.static('frontend'));

