import { Request, Response } from "express";

const calculateSalary = (salary: number, tax: number): number => {
  const totalTax = (salary * tax) / 100;
  return salary - totalTax;
};
const formatDisplay = (totalSalary: number): string => {
  return `อัตราเงินเดือนหลังหักภาษี คือ ${totalSalary} บาท`;
};

export const Salary = (req: Request, res: Response) => {
  const { salary, tax } = req.query;
  try {
    if (!salary || !tax) {
      res.status(400).send(`กรุณากรอกข้อมูลให้ครบถ้วน`);
    }

    const totalSalary = calculateSalary(
      parseFloat(salary as string),
      parseFloat(tax as string)
    );
    const result = formatDisplay(totalSalary);
    res.send(result);
  } catch (error) {
    console.log(error);
  }
};
