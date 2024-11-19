import mongoose, { Schema, Document } from "mongoose";
import Position from "./positionSchema";

interface EmployeeDocument extends Document {
  employeeCode: string;
  employeeName: string;
  employeeTotalLeave: number;
  employeeSalary: number;
  position: mongoose.Types.ObjectId;
}

const EmployeeSchema = new Schema<EmployeeDocument>({
  employeeCode: { type: String, unique: true, required: true },
  employeeName: { type: String, required: true },
  employeeTotalLeave: { type: Number },
  employeeSalary: { type: Number },
  position: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Position,
    required: true,
  },
});

// Registering the model with the name 'Students'
const Employee = mongoose.model<EmployeeDocument>("Employee", EmployeeSchema);

export default Employee;
