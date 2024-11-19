import { Request, Response } from "express";

//basic condition
export const condition = (req: Request, res: Response) => {
  const { id, paidPerDay, dayOfWork } = req.query || 0;

  try {
    if (id && Number(id) !== 0) {
      if (!paidPerDay || !dayOfWork) {
        res.status(400).json({
          message: "กรุณากรอกข้อมูลให้ครบถ้วน",
        });
      }
      res.status(200).json({
        ID: id,
        paidPerDay: `${paidPerDay} บาทต่อวัน`,
        dayOfWork: `ทำงาน ${dayOfWork} วัน`,
        total: `${(
          Number(paidPerDay) * Number(dayOfWork)
        ).toLocaleString()} บาท`,
      });
    } else {
      res.status(400).json({
        message: "ไม่พบไอดีพนักงาน",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//salary tax condition
export const salaryCal = (req: Request, res: Response) => {
  const { paidPerDay, dayOfWork } = req.query || 0;
  const salary = Number(paidPerDay) * Number(dayOfWork);
  const yearly = salary * 12;
  let tax: number = 0;

  if (!paidPerDay || !dayOfWork) {
    res.status(400).json({
      code: "ERROR-01-00",
      status: "error",
      msg: "กรุณากรอกข้อมูลให้ครบถ้วน",
    });
  } else {
    if (yearly < 150000) {
      tax = yearly * 0;
    } else if (yearly > 150001 && yearly < 300000) {
      tax = yearly * 0.05;
    } else if (yearly > 300001 && yearly < 500000) {
      tax = yearly * 0.1;
    } else {
      tax = yearly * 0.15;
    }

    res.status(200).json({
      code: "SUCCESS-01-001",
      status: "ok",
      data: {
        salary: salary.toLocaleString(),
        yearly: yearly.toLocaleString(),
        tax: tax.toLocaleString(),
      },
    });
  }
};
export const salaryCalSwitch = (req: Request, res: Response) => {
  const { paidPerDay, dayOfWork } = req.query || 0;
  const salary = Number(paidPerDay) * Number(dayOfWork);
  const yearly = salary * 12;
  let tax: number = 0;

  if (!paidPerDay || !dayOfWork) {
    res.status(400).json({
      code: "ERROR-01-00",
      status: "error",
      msg: "กรุณากรอกข้อมูลให้ครบถ้วน",
    });
  } else {
    switch (yearly) {
      case 150000:
        tax = yearly * 0;
        break;
      case 300000:
        tax = yearly * 0.05;
        break;
      case 500000:
        tax = yearly * 1;
        break;
      default:
        tax = yearly * 0.15;
    }

    res.status(200).json({
      code: "SUCCESS-01-001",
      status: "ok",
      data: {
        salary: salary.toLocaleString(),
        yearly: yearly.toLocaleString(),
        tax: tax.toLocaleString(),
      },
    });
  }
};

export const workshop = (req: Request, res: Response) => {};
