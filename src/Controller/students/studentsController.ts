import { Request, Response } from "express";
import Student from "../../models/studentsSchema"; // Make sure the path is correct
import Faculty from "../../models/facultiesSchema"; // Make sure the path is correct

export const getStudents = async (req: Request, res: Response) => {
  const { studentCode } = req.body;

  try {
    let students;
    if (!studentCode) {
      students = await Student.find().populate("faculty");
    } else {
      students = await Student.find({
        studentCode: studentCode,
      }).populate("faculty");
    }

    if (!students || students.length === 0) {
      return res.status(404).json({ message: "No students found" });
    }

    res.status(200).json({ status: "Success", data: students });
  } catch (error) {
    console.error(error);
    const err = error as Error;
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const updateStudent = async (req: Request, res: Response) => {
  const { data } = req.body;

  try {
    const student = await Student.findOne({ studentCode: data.studentCode });

    if (!student) {
      return res
        .status(404)
        .json({ status: "Error", message: "Student not found" });
    }
    //ถ้ามีข้อมูลส่งมาก็จะเซพไป ไม่มีก็ใช้ค่าเดิม
    student.studentName = data.studentName || student.studentName;
    student.goodScore = data.goodScore || student.goodScore;
    student.faculty = data.faculty || student.faculty;

    await student.save();

    res.status(200).json({
      status: "Success",
      message: "Student updated successfully",
      data: student,
    });
  } catch (error) {
    console.error(error);
    const err = error as Error;
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
