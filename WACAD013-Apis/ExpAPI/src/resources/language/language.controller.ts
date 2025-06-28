import { Request, Response } from "express";

function changeLanguage (req: Request, res: Response) {
  const { lang } = req.body;
  res.cookie("lang", lang);
  res.json({ message: `Language changed to ${lang}` });
};

export default { changeLanguage };