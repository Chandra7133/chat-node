const mongoQuery = require("@cs7player/login-lib").mongoQuery;
const pbkdf = require("@cs7player/login-lib").pbkdf;
const otp = require("@cs7player/login-lib").otp;
const jwt = require("@cs7player/login-lib").jwt;
const otpJson = require("../../utils/otp.json");

exports.invite = async (reqParams) => {
 try {
  let { sender_id, receiver_id } = reqParams;
  created_at = new Date();
  const result = await mongoQuery.insertOne(INVITATIONS, { sender_id, receiver_id, created_at });
  return result || [];
 } catch (error) {
  throw error
 }
}

exports.sended = async (reqParams) => {
 try {
  let { user_id } = reqParams;
  let pipeline = [{ $match: { 'sender_id':user_id } }]
  const result = await mongoQuery.getDetails(INVITATIONS, pipeline);
  return result || [];
 } catch (error) {
  throw error
 }
}

exports.received = async (reqParams) => {
 try {
  let { user_id } = reqParams;
  let pipeline = [{ $match: { 'receiver_id':user_id } }]
  const result = await mongoQuery.getDetails(INVITATIONS, pipeline);
  return result || [];
 } catch (error) {
  throw error
 }
}

exports.accept = async (reqParams) => {
 try {
  let { _id } = reqParams;
  const data = await mongoQuery.getDetails(INVITATIONS, [{ $match: { _id } }]);
  let user_id = data[0]['receiver_id'];
  let friend_id = data[0]['sender_id'];
  let result = await mongoQuery.updateOne(FRIENDS, { user_id }, { $push: { friends : friend_id } });
  await mongoQuery.deleteOne(INVITATIONS, { _id });
  return result || [];
 } catch (error) {
  throw error
 }
}

exports.decline = async (reqParams) => {
 try {
  let { _id } = reqParams;
  let result = await mongoQuery.deleteOne(INVITATIONS, { _id });
  return result || [];
 } catch (error) {
  throw error
 }
}
