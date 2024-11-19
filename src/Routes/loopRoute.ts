// import { Router } from "express";
import { Router, Request, Response } from "express";

// import { Salary } from "../Controller/loopController";

const router = Router();

const Data: Array<string> = ["A", "B"];

interface User {
  stdID: string;
  name: string;
  surname: string;
}
const userData: User[] = [
  {
    stdID: "65039089",
    name: "Narisara",
    surname: "Changsadao",
  },
  {
    stdID: "64039089",
    name: "Wa",
    surname: "HW",
  },
  {
    stdID: "64039088",
    name: "TK",
    surname: "HW",
  },
];

const Loop = (req: Request, res: Response) => {
  let result: Array<object>;

  result = userData.map((data: User) => {
    return {
      name: data.name,
      surname: data.surname,
      fullName: data.name + " " + data.surname,
    };
  });

  res.json({
    code: "success-01-0001",
    data: result,
  });
};
const getUser = (req: Request, res: Response) => {
  const search = (req.query.search || "").toString().toLowerCase();
  let result;

  if (search == "") {
    result = userData.map((data: User) => {
      return `${data.stdID}) ${data.name} ${data.surname}`;
    });
  } else {
    result = userData
      .filter(
        (data) =>
          data.name.toLowerCase().includes(search) ||
          data.surname.toLowerCase().includes(search)
      )
      .map((data) => `${data.stdID}) ${data.name} ${data.surname}`);
  }

  res.send(result);
};

const workshop = (req: Request, res: Response) => {
  interface Subject {
    code: string;
    name: string;
  }
  const students: Array<string> = ["สมใจ", "สมชาย", "สมหญิง"];
  const subjects: Subject = { code: "CSI401", name: "Back-End" };

  let result: Array<object>;

  result = students.map((student) => {
    return {
      student: student,
      code: subjects.code,
      name: subjects.name,
    };
  });
  res.send(result);
};

router.get("/loop", Loop);
router.get("/getUser", getUser);
router.get("/loopWorkshop", workshop);
// router.get("/workshop", Salary);

export default router;
