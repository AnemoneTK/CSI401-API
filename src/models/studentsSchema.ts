import mongoose, { Schema, Document } from "mongoose";
import Faculty from "./facultiesSchema";

interface StudentDocument extends Document {
  studentCode: string;
  studentName: string;
  goodScore: number;
  faculty: mongoose.Types.ObjectId;
}

const StudentsSchema = new Schema<StudentDocument>({
  studentCode: { type: String, unique: true, required: true },
  studentName: { type: String, required: true },
  goodScore: { type: Number, default: 0 },
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Faculty,
    required: true,
  },
});

// Registering the model with the name 'Students'
const Student = mongoose.model<StudentDocument>("Student", StudentsSchema);

export default Student;
