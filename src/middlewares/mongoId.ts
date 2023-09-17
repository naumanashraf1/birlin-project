import { NextFunction, Request, Response } from "express";

export const mongoIdValidator = (param: string | string[]) => {
  return (
    req: Request<{ [param: string]: string }>,
    res: Response,
    next: NextFunction
  ) => {
    if (typeof param == "string") {
      const id = req?.params[param] || "";

      // You can also try mongoose.Types.ObjectId.isValid(id) but this dont validate hex
      const isParamaterValid = /^[a-fA-F0-9]{24}$/.test(id);

      if (!isParamaterValid)
        return res
          .status(400)
          .send({ message: `Given ${id} is not a valid id.` });
    }

    if (Array.isArray(param)) {
      param.forEach((p) => {
        const id = req?.params[p] || "";

        // You can also try mongoose.Types.ObjectId.isValid(id) but this dont validate hex
        const isParamaterValid = /^[a-fA-F0-9]{24}$/.test(id);

        if (!isParamaterValid)
          return res
            .status(400)
            .send({ message: `Given ${id} is not a valid id.` });
      });
    }

    return next();
  };
};
