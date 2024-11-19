import { Request, Response } from "express";

const calculate = (num1: number, num2: number): number => {
  return num1 / num2;
};
const displayRes = (num1: Number, num2: Number, res: Response) => {
  const result = calculate(Number(num1), Number(num2)).toFixed(2);

  res.send({
    num1: num1,
    num2: num2,
    result: Number(result),
  });
};

export const calNum = (req: Request, res: Response) => {
  const { num1, num2 } = req.query;
  try {
    if (!num1 || !num2) {
      res.status(400).json({ message: "กรุณากรอกตัวเลขให้ครบถ้วน" });
    }
    if (Number(num2) === 0) {
      res.status(400).json({ message: "ตัวหารไม่ควรเท่ากับ 0" });
    }
    displayRes(Number(num1), Number(num2), res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์" });
  }
};
