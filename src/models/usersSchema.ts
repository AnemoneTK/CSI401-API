import mongoose, { Schema, Document, Types } from "mongoose";

// interface PermissionDocument extends Document {
//   role: string;
// }

const UsersSchema = new Schema({
  code: { type: String, unique: true, required: true },
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
});

export default mongoose.model("Users", UsersSchema);
