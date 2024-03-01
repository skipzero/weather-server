import User from '../models/user';
import { RequestHandler } from 'express';

export const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const users = await User.find().exec()
    res.status(200).json(users)
  } catch (err) {
    next(err)
  }
}

// export const getUserByEmail: RequestHandler = async (req, res, next) => {
//   try {
//     const user = await (email: string) => User.findOne({ email })
// export const getUserBySessionToken = (sessionToken: string) => User.findOne({ 
//   'authentication.sessionToken': sessionToken
// });
// export const getUserById = (id: string) => User.findById(id);
// export const createUser = (values: Record<string, any>) => new User(values)
//   .save().then((user) => user.toObject());
// export const deleteUserById = (id: string) => User.findOneAndDelete({ _id: id});
// export const updateUserById = (id: string, values: Record<string, any>) => User.findByIdAndUpdate({id, values})