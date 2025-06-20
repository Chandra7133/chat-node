const { mongoHelper } = require("../mongoose")

getDetails = async (collection, pipeline) => {
 try {
  const result = await mongoHelper.getDetails(collection, pipeline)
  return result
 } catch (error) {
  throw error
 }
}
insertOne = async (collection, data) => {
 try {
  const result = await mongoHelper.insertOne(collection, data)
  return result
 } catch (error) {
  throw error
 }
}
insertMany = async (collection, dataArray) => {
 try {
  const result = await mongoHelper.insertMany(collection, dataArray)
  return result
 } catch (error) {
  throw error
 }
}
updateOne = async (collection, filter, updateDoc) => {
 try {
  const result = await mongoHelper.updateOne(collection, filter, updateDoc)
  return result
 } catch (error) {
  throw error
 }
}
updateMany = async (collection, filter, updateDoc) => {
 try {
  const result = await mongoHelper.updateMany(collection, filter, updateDoc)
  return result
 } catch (error) {
  throw error
 }
}
deleteOne = async (collection, filter) => {
 try {
  const result = await mongoHelper.deleteOne(collection, filter)
  return result
 } catch (error) {
  throw error
 }
}
deleteMany = async (collection, filter) => {
 try {
  const result = await mongoHelper.deleteMany(collection, filter)
  return result
 } catch (error) {
  throw error
 }
}

module.exports = {
 insertOne,
 insertMany,
 updateOne,
 updateMany,
 deleteOne,
 deleteMany,
 getDetails
}