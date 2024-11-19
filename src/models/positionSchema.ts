import mongoose, { Schema, Document } from "mongoose";

// Interface for Faculty Document
interface PositionDocument extends Document {
  positionName: string;
  positionWorkDay: string;
}

const PositionSchema = new Schema<PositionDocument>({
  positionName: { type: String, required: true, unique: true },
  positionWorkDay: { type: String, required: true },
});

const Position = mongoose.model<PositionDocument>("Position", PositionSchema);

export default Position;
