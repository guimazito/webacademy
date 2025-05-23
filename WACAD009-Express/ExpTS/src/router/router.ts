import { Router, Request, Response } from "express";
import { LoremIpsum } from "lorem-ipsum";

const router = Router();

router.get("/", (req: Request, res: Response) => {
    res.send("Você está na raiz da aplicação");
});

router.get("/hb1", (req: Request, res: Response) => {
    res.render("hb1", {
        message: "Seja bem-vindo ao Handlebars 1",
        layout: false
    })
});

router.get("/hb2", (req: Request, res: Response) => {
    res.render("hb2", {
        show: true,
        message: "Seja bem-vindo ao Handlebars 2",
        layout: false
    })
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