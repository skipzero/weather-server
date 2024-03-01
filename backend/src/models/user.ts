import mongoose, {InferSchemaType, Schema, model } from "mongoose";

const userSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  username: { type: String, required: true, unique: true},
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true, select: false},
}, {timestamps: true});

type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);