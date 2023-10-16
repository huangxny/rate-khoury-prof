import {MongoClient, ObjectId} from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();
// eslint-disable-next-line require-jsdoc
function mydb() {
  const me = {};
  const mongoUrl = process.env.MONGODB_URI;
  const connect = async () => {
    const client = new MongoClient(mongoUrl);
    await client.connect();
    const db = await client.db('rmp');
    return {client, db};
  };
  // ---- read ----  
  me.getProfs = async () => {
    const {client, db} = await connect();
    const profsCollection = db.collection('profs');
    const documents = await profsCollection.find({}).toArray();
    try {
      return documents;
    } finally {
      await client.close();
    }
  };
  me.getProfById = async (id) => {
    const {client, db} = await connect();
    const profsCollection = db.collection('profs');
    const documents =
        await profsCollection.find({_id: new ObjectId(id)}).toArray();
    try {
      return documents;
    } finally {
      await client.close();
    }
  };
  me.getCommentsByPid = async (pid) => {
    const {client, db} = await connect();
    const commentCollection = db.collection('comments');
    const documents = await commentCollection.find({pid: pid}).toArray();
    try {
      return documents;
    } finally {
      await client.close();
    }
  };

  // ---- write ----
  me.addProf = async (name, courseArray) => {
    const {client, db} = await connect();
    const profsCollection = db.collection('profs');
    // eslint-disable-next-line max-len
    const res = await profsCollection.insertOne({name: name, course: courseArray, score: 0});
    try {
      return res;
    } finally {
      await client.close();
    }
  };
  me.addComment = async (score, comment, pid) => {
    const {client, db} = await connect();
    const commentCollection = db.collection('comments');
    // eslint-disable-next-line max-len
    const res = await commentCollection.insertOne({score: score, comment: comment, pid: pid});
    try {
      return res;
    } finally {
      await client.close();
    }
  };
  me.deleteComment = async (commentId) => {
    const {client, db} = await connect();
    const commentCollection = db.collection('comments');
    // eslint-disable-next-line max-len
    const res = await commentCollection.deleteOne({_id: new ObjectId(commentId)});
    try {
      return res;
    } finally {
      await client.close();
    }
  };
  me.updateScore = async (profId, avgScore) => {
    const {client, db} = await connect();
    const profsCollection = db.collection('profs');
    // eslint-disable-next-line max-len
    const res = await profsCollection.updateOne({_id: new ObjectId(profId)}, {$set: {score: avgScore}});
    try {
      return res;
    } finally {
      await client.close();
    }
  };
  return me;
}
// It might be possible to split the Adding Professor Functionality section and the Rating Professors section into two distinct MyDB files.
export const myDB = mydb();
