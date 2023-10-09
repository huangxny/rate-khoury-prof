import {MongoClient} from "mongodb";

function mydb() {
    const me = {};
    const mongoUrl = "mongodb+srv://huangxny:sTrohg55pzkwnmO7@cluster0.s1qbuus.mongodb.net/?retryWrites=true&w=majority";
    const connect = async () => {
        const client = new MongoClient(mongoUrl);
        await client.connect();
        const db =  await client.db('rmp');
        return {client,db};
    }

    me.getProfs = async ({query = {}, MaxElements = 10}={}) => {
        const {client,db} = await connect();
        const profsCollection = db.collection('profs');
        const documents = await profsCollection.find({}).toArray();
        console.log(documents);
        try {
            return  documents;
        } finally {
            client.close();
        }
    }

    me.addProf = async (name, courseArray) => {
        const {client,db} = await connect();
        const profsCollection = db.collection('profs');
        const res = await profsCollection.insertOne({name:name, course:courseArray});
        try {
            return res;
        } finally {
            client.close();
        }
    }
    return me;
}
export const myDB = mydb();