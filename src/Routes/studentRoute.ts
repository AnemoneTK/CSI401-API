import { Router, Request, Response } from "express";
import {
  getStudents,
  updateStudent,
} from "../Controller/students/studentsController";
const router = Router();

// export const getStudent = (req: Request, res: Response) => {
//   res.send(`
//           รหัสนักศึกษา : 65039089
//           ชื่อนักศึกษา : นางสาวนริศรา จ่างสะเดา
//           ความสนใจ : Coding, Listen music, Money, Sleep
//           อาชีพในฝัน : อยู่บ้านเลี้ยงแมว,งู
//       `);
// };

router.post("/students", getStudents);
// router.post("/student", getStudent);
router.post("/update", updateStudent);

export default router;
