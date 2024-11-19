import { Request, Response } from "express";

interface responseFormat {
  code: string;
  status: string;
  data: object;
}

export const SignIn = (req: Request, res: Response) => {
  const reqHeader: any = req.headers;
  const xAppKey: string = reqHeader["x-application-key"];
  const { username, password } = req.body;
  let responseSuccess: responseFormat;
  let responseError: responseFormat;

  if (!xAppKey) {
    responseError = {
      code: "ERROR-01-0001",
      status: "ERROR",
      data: { message: "x-application-key not found" },
    };
    res.status(401).send(responseError);
  } else if (xAppKey != "ssp") {
    responseError = {
      code: "Error-01-0002",
      status: "ERROR",
      data: { message: "invalid x-application-key " },
    };
    res.status(401).send(responseError);
  } else {
    if (username && password) {
      responseSuccess = {
        code: "Success-01-0001",
        status: "OK",
        data: { username: username },
      };
      res.status(200).send(responseSuccess);
    } else if (!username || !password) {
      responseError = {
        code: "ERROR-01-0001",
        status: "ERROR",
        data: { message: "invalid username or password " },
      };
      res.status(401).send(responseError);
    }
  }
};

export const SignOut = (req: Request, res: Response) => {
  res.send("Sign out");
};
