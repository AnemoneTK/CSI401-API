import { Request, Response } from "express";
import usersSchema from "../models/usersSchema";

const Users = usersSchema;

export const createUser = async (req: Request, res: Response) => {
  const { code, firstName, lastName } = req.body;

  // Validate request data
  if (!code || !firstName || !lastName) {
    return res
      .status(400)
      .json({ status: "error", message: "กรุณากรอกข้อมูลให้ครบถ้วน" });
  }

  try {
    // Check if code already exists
    const existingUser = await Users.findOne({ code: code });
    if (existingUser) {
      return res
        .status(400)
        .json({ status: "error", message: "เลขประจำตัวนี้ถูกใช้งานแล้ว" });
    }

    const user = await Users.create({
      code,
      firstName,
      lastName,
    });

    // Respond success if creation was successful
    return res.status(200).json({
      status: "success",
      message: "เพิ่มผู้ใช้สำเร็จ",
      data: user,
    });
  } catch (error) {
    // Error handling
    console.error("Error creating user:", error);
    return res
      .status(500)
      .json({ status: "error", message: "เกิดข้อผิดพลาด", error });
  }
};
export const createUsers = async (req: Request, res: Response) => {
  const { userDatas } = req.body;

  // Validate request data
  if (!userDatas || !Array.isArray(userDatas) || userDatas.length === 0) {
    return res
      .status(400)
      .json({ status: "error", message: "กรุณากรอกข้อมูลให้ครบถ้วน" });
  }

  try {
    // Extract all codes from userDatas
    const codes = userDatas.map((user) => user.code);

    // Check if any of the codes already exist in the database
    const existingUsers = await Users.find({ code: { $in: codes } });
    if (existingUsers.length > 0) {
      return res.status(400).json({
        status: "error",
        message: "เลขประจำตัวบางรายการถูกใช้งานแล้ว",
        existingCodes: existingUsers.map((user) => user.code),
      });
    }

    // Insert new users if no duplicates found
    const users = await Users.insertMany(userDatas);

    // Respond success if creation was successful
    return res.status(200).json({
      status: "success",
      message: "เพิ่มผู้ใช้สำเร็จ",
      data: users,
    });
  } catch (error) {
    // Error handling
    console.error("Error creating users:", error);
    return res
      .status(500)
      .json({ status: "error", message: "เกิดข้อผิดพลาด", error });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await Users.find();
    if (users) {
      res.status(200).json({ status: "success", data: users });
    }
  } catch (error) {
    // Error handling
    console.error("Error creating user:", error);
    return res
      .status(500)
      .json({ status: "error", message: "เกิดข้อผิดพลาด", error });
  }
};
