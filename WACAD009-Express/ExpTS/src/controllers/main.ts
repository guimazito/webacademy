import { Prof, Technology } from "../types/main";
import { LoremIpsum } from "lorem-ipsum";
import { Request, Response } from "express";

const index = (req: Request, res: Response) => {
    res.send("Você está na raiz da aplicação");
};

const hb1 = (req: Request, res: Response) => {
    res.render("main/hb1", {
        message: "Olá, você está aprendendo Express + HBS!",
        layout: "main",
    })
};

const hb2 = (req: Request, res: Response) => {
    res.render("hb2", {
        poweredByNodejs: true,
        name: "Express",
        type: "Framework",
        layout: "main",
    })
};

const hb3 = (req: Request, res: Response) => {
    const profes: Prof[] = [
        { nome: "David Fernandes", sala: 1238 },
        { nome: "Horácio Fernandes", sala: 1233 },
        { nome: "Edleno Moura", sala: 1236 },
        { nome: "Elaine Harada", sala: 1231 }
    ];
        res.render("hb3", { profes, layout: "main" });
};

const hb4 = (req: Request, res: Response) => {
    const technologies: Technology[] = [
        { name: 'Express', type: 'Framework', poweredByNodejs: true },
        { name: 'Laravel', type: 'Framework', poweredByNodejs: false },
        { name: 'React', type: 'Library', poweredByNodejs: true },
        { name: 'Handlebars', type: 'Engine View', poweredByNodejs: true },
        { name: 'Django', type: 'Framework', poweredByNodejs: false },
        { name: 'Docker', type: 'Virtualization', poweredByNodejs: false },
        { name: 'Sequelize', type: 'ORM tool', poweredByNodejs: true },
    ];
        res.render('hb4', { technologies, layout: "main" });
};

const loremIpsum = (req: Request, res: Response) => {
    const { paragraphs } = req.params;
    const lorem = new LoremIpsum({
        sentencesPerParagraph: {
            max: 8,
            min: 4
        },
        wordsPerSentence: {
            max: 16,
            min: 4
        }
    });

    const text = lorem.generateParagraphs(Number(paragraphs));
    res.send(text.replace(/\n/g, "<br><br>"));
};

const about = (req: Request, res: Response) => {
    res.json({
        nome: "Instituto de Computação",
        fundacao: 2011
    });
};

export default {
    index,
    hb1,
    hb2,
    hb3,
    hb4,
    loremIpsum,
    about,
};