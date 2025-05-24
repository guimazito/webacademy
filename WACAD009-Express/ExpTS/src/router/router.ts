import { Prof } from "../types/main";
import { LoremIpsum } from "lorem-ipsum";
import { Router, Request, Response } from "express";
import mainController from "../controllers/main";

const router = Router();

router.get("/", mainController.index);

router.get("/hb1", (req: Request, res: Response) => {
    res.render("hb1", {
        message: "Seja bem-vindo ao Handlebars 1",
        layout: false
    })
});

router.get("/hb2",mainController.hb2);

router.get('/hb3', (req: Request, res: Response) => {
    const profes: Prof[] = [
        { nome: "David Fernandes", sala: 1238 },
        { nome: "Horácio Fernandes", sala: 1233 },
        { nome: "Edleno Moura", sala: 1236 },
        { nome: "Elaine Harada", sala: 1231 }
    ];
    res.render("hb3", { profes, layout: false });
});

router.get('/hb4', function (req: Request, res: Response) {
    const profes = [
        { nome: 'David Fernandes', sala: 1238 },
        { nome: 'Horácio Fernandes', sala: 1233 },
        { nome: 'Edleno Moura', sala: 1236 },
        { nome: 'Elaine Harada', sala: 1231 },
    ];
    res.render('hb4', { profes, layout: false });
});

router.get("/about", (req: Request, res: Response) => {
    res.json({
        nome: "Instituto de Computação",
        fundacao: 2011
    })
});

router.get("/lorem/:paragraphs", (req: Request, res: Response) => {
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
});

// router is a middleware that is used to handle requests
export default router;