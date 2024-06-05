import { Request, Response, NextFunction } from "express";

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  //   const token = req.headers.authorization;
  //   if (!token) {
  //     return res.status(401).send({ message: "Token is not supplied" });
  //   }
  //   try {
  //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //     req.user = decoded;
  //     next();
  //   } catch (error) {
  //     return res.status(401).send({ message: "Invalid Token" });
  //   }
  next();
}

export function isRoleAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
  role: string
) {
  next();
}
