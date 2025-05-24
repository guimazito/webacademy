import { Router, Request, Response } from "express";

const index = (req: Request, res: Response) => {
    res.send("Você está na raiz da aplicação");
};

const hb2 = (req: Request, res: Response) => {
    res.render("hb2", {
        poweredByNodejs: true,
        name: "Express",
        type: "Framework",
        layout: "main"
    })
};

export default {
    index,
    hb2
};