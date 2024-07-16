import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  email: string;
  name: string;
  password: string;
  admin: boolean;
  approved: boolean;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  admin: { type: Boolean, default: false },
  approved: { type: Boolean, default: false },
});

const User = mongoose.model<IUser>('User', UserSchema);
export default User;
export { IUser };
