import mongoose, { Schema, Document } from "mongoose";

// Interface for Faculty Document
interface FacultyDocument extends Document {
  facultyName: string;
  facultyAbbreviation: string;
}

const FacultiesSchema = new Schema<FacultyDocument>({
  facultyName: { type: String, required: true },
  facultyAbbreviation: { type: String, required: true, unique: true },
});

const Faculty = mongoose.model<FacultyDocument>("Faculty", FacultiesSchema);

export default Faculty;
