const { connectDB } = require("./conn");

exports.getDetails = async (collection, pipeline) => {
 const conn = await connectDB();
 return await conn.collection(collection).aggregate(pipeline).toArray();
};

exports.insertOne = async (collection, data) => {
 const conn = await connectDB();
 return await conn.collection(collection).insertOne(data);
};

exports.insertMany = async (collection, dataArray) => {
 const conn = await connectDB();
 return await conn.collection(collection).insertMany(dataArray);
};

exports.updateOne = async (collection, filter, updateDoc) => {
 const conn = await connectDB();
 return await conn.collection(collection).updateOne(filter, { $set: updateDoc });
};

exports.updateMany = async (collection, filter, updateDoc) => {
 const conn = await connectDB();
 return await conn.collection(collection).updateMany(filter, { $set: updateDoc });
};

exports.deleteOne = async (collection, filter) => {
 const conn = await connectDB();
 return await conn.collection(collection).deleteOne(filter);
};

exports.deleteMany = async (collection, filter) => {
 const conn = await connectDB();
 return await conn.collection(collection).deleteMany(filter);
};

exports.dateToString = (key, format, timezone = TIMEZONE) => {
 return { $dateToString: { format, date: `$${key}`, timezone } };
}
