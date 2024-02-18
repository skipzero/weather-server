import mongoose, { Schema, Document } from "mongoose";

const UserSchema: Schema = new mongoose.Schema({
  username: { type: String, required: true},
  email: { type: String, required: true},
  authentication: {
    password: { type: String, required: true, select: false},
    salt: { type: String, select: false},
    sessionToken: { type: String, select: false}
  }
})