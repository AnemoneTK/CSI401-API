import { Request, Response } from "express";
import Employee from "../models/employeeSchema"; // Make sure the path is correct
import Position from "../models/positionSchema"; // Make sure the path is correct

export const addEmployee = async (req: Request, res: Response) => {
  const reqHeader: any = req.headers;
  const xAppKey: string = reqHeader["x-application-key"];
  const {
    employeeCode,
    employeeName,
    employeeTotalLeave,
    employeeSalary,
    position,
  } = req.body;

  if (!xAppKey) {
    return res
      .status(401)
      .json({ status: "Error", message: "กรุณายืนยันตัวตน" });
  }

  if (
    !employeeCode ||
    !employeeName ||
    !employeeTotalLeave ||
    !employeeSalary ||
    !position
  ) {
    return res
      .status(400)
      .json({ status: "Error", message: "กรุณากรอกข้อมูลให้ครบถ้วน" });
  }

  try {
    const checkCode = await Employee.findOne({
      employeeCode: employeeCode,
    });
    if (checkCode) {
      return res.status(400).json({
        status: "Error",
        message: "รหัสพนักงานนี้มีอยู่ในระบบแล้ว",
      });
    }
    const newEmployee = {
      employeeCode,
      employeeName,
      employeeTotalLeave,
      employeeSalary,
      position,
    };

    await Employee.collection.insertOne(newEmployee);

    res.status(201).json({
      status: "Success",
      message: "เพิ่มข้อมูลพนักงานสำเร็จ",
      data: newEmployee,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

export const updateData = async (req: Request, res: Response) => {
  const reqHeader: any = req.headers;
  const xAppKey: string = reqHeader["x-application-key"];
  const id: string = reqHeader["document-id"];
  const {
    employeeCode,
    employeeName,
    employeeTotalLeave,
    employeeSalary,
    position,
  } = req.body;

  if (!xAppKey) {
    return res
      .status(401)
      .json({ status: "Error", message: "กรุณายืนยันตัวตน" });
  }
  if (!id) {
    return res
      .status(401)
      .json({ status: "Error", message: "กรุณาระบุไอดีที่จะแก้ไข" });
  }
  if (
    !employeeCode ||
    !employeeName ||
    !employeeTotalLeave ||
    !employeeSalary ||
    !position
  ) {
    return res
      .status(400)
      .json({ status: "Error", message: "กรุณากรอกข้อมูลให้ครบถ้วน" });
  }

  try {
    const old = await Employee.findOne({ _id: id });
    if (!old) {
      return res
        .status(404)
        .json({ status: "Error", message: "ไม่พบผู้ใช้งาน" });
    }

    const EmpUpdate = await Employee.updateOne(
      { _id: id },
      {
        $set: {
          employeeCode: employeeCode,
          employeeName: employeeName,
          employeeTotalLeave: employeeTotalLeave,
          employeeSalary: employeeSalary,
          position: position,
        },
      }
    );

    res.status(201).json({
      status: "Success",
      message: "อัปเดตข้อมูลสำเร็จ",
      data: EmpUpdate,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

export const getList = async (req: Request, res: Response) => {
  const reqHeader: any = req.headers;
  const xAppKey: string = reqHeader["x-application-key"];

  if (!xAppKey) {
    return res
      .status(401)
      .json({ status: "Error", message: "กรุณายืนยันตัวตน" });
  }

  try {
    const list = await Employee.find().populate("position");
    if (list.length === 0) {
      return res
        .status(200)
        .json({ status: "ok", message: "ไม่มีรายชื่อพนักงาน" });
    }

    return res.status(200).json({ status: "Success", data: list });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};
