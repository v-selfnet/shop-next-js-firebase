
import { MongoClient, ServerApiVersion } from "mongodb";

/**
 * @type {import("mongodb").Db}
 */

console.log(process.env.DB_USER)

let db;
const DbConnect = async () => {
    if (db) return db;
    try {
        const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vgnfmcl.mongodb.net/?retryWrites=true&w=majority`;
        const client = new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });
        db = client.db('shopOnline');
        await client.db("admin").command({ ping: 1 });
        console.log('Shop Online Services has been successfully connected to MongoDB!')
        return db;
    } catch (error) {
        console.error(error.message)
    }
};

DbConnect();
export default DbConnect;