const { MongoClient, ObjectId } = require("mongodb");

// Connection URL
const url = "mongodb+srv://tunaman:7QDNydRFKrKRyxW@cluster0.uyh9g.mongodb.net/";
// Database Name
const dbName = "building-admin";

const client = new MongoClient(`${url}${dbName}`);

exports.getDataObj = async function (collectionName) {
    await client.connect();
    console.log(`Get all collection: ${url}${dbName}`);
    try {
        return client.db().collection(collectionName).find({}).toArray();
    } catch (error) {
        if (error instanceof MongoServerError) {
            console.log(`Error worth logging: ${error}`); // special case for some reason
        }
        throw error; // still want to crash
    }
};
exports.getDataObj = async function (collectionName, graphQuery) {
    await client.connect();
    console.log(
        `Seek record collection: ${collectionName}  data:${JSON.stringify(
            graphQuery
        )}`
    );
    try {
        return client.db().collection(collectionName).find(graphQuery).toArray();
    } catch (error) {
        if (error instanceof MongoServerError) {
            console.log(`Error worth logging: ${error}`); // special case for some reason
        }
        throw error; // still want to crash
    }
};
exports.getDataByID = async function (collectionName, ID) {
    try {
        await client.connect();
        // console.log(`${collectionName}-${JSON.stringify(ID)}`);
        return client.db().collection(collectionName).find(ObjectId(ID)).toArray();
    } catch (error) {
        console.log(`Error MongoDB: ${JSON.stringify(error)}`);
        return null;
    }
};
exports.setData = async function (collectionName, data) {
    try {
        await client.connect();
        // console.log(`${collectionName}-${JSON.stringify(data)}`);
        return client.db().collection(collectionName).insertMany(data);
    } catch (error) {
        console.log(`Error MongoDB: ${JSON.stringify(error)}`);
        return null;
    }
};
exports.updateData = async function (collectionName, id, data) {
    try {
        await client.connect();
        delete data._id;
        let updateOBJ = { $set: data };
        // console.log(`${collectionName}-${id}-${JSON.stringify(updateOBJ)}`);
        return client
            .db()
            .collection(collectionName)
            .updateOne({ _id: ObjectId(id) }, updateOBJ);
    } catch (error) {
        console.log(`Error MongoDB: ${JSON.stringify(error)}`);
        return null;
    }
};
exports.deleteData = async function (collectionName, id) {
    try {
        await client.connect();
        // console.log(`${collectionName}-${id}`);
        return client
            .db()
            .collection(collectionName)
            .deleteOne({ _id: ObjectId(id) });
    } catch (error) {
        console.log(`Error MongoDB: ${JSON.stringify(error)}`);
        return null;
    }
};