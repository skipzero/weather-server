import createHttpError from 'http-errors';
import User from '../models/user';
import { RequestHandler } from 'express';
import bcrypt from 'bcrypt';
interface SignupBody {
  username?: string,
  email?: string,
  password?: string,
}

export const signup: RequestHandler<unknown, unknown, SignupBody, unknown> = async (req, res, next) => {
  const { username, email, password } = req.body;
  
  try {
    if (!username || !email || !password) {
      throw createHttpError(400, 'missing username or password');
    }

    const existingUserName = await User.findOne({ username }).exec();
    if (existingUserName) {
      throw createHttpError(409, 'username already in exists');
    }
    
    const existingEmail = await User.findOne({ email }).exec();
    if (existingEmail) {
      throw createHttpError(409, 'email already in exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    })

    req.session.userId = newUser._id;

    res.status(201).json(newUser);

  } catch (err) {
    next(err)
  }
}

interface LoginBody {
  username?: string,
  password?: string,
}

export const login: RequestHandler<unknown, unknown, LoginBody, unknown> = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      throw createHttpError(400, 'field missing...')
    }

    const user = await User.findOne({ username }).select('+password +email').exec();

    if (!user) {
      throw createHttpError(404, 'user does not exist...')
    }    

    const passwordMatch = bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      throw createHttpError(401, 'wrong credentials...')
    }

    req.session.userId = user._id;
    res.status(201).json(user)

  } catch (err) {
    next(err)
  } 

}

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