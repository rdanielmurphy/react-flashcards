import jsCards from "./javascript/javascriptCards";
import blockchainCards from "./blockchain/blockchainCards";
import theoryCards from "./theory/theoryCards";
import javaCards from "./java/javaCards";
import greCards from "./gre/greCards";
import puzzleCards from "./puzzles/puzzleCards";
import htmlcssCards from "./htmlcss/htmlcssCards";

const FlashCardData = {
    "js" :  {
        "name" : "JavaScript",
        "cards" : jsCards,
        "fa" : "code"
    },
    "htmlcss" : {
        "name" : "HTML/CSS",
        "cards" : htmlcssCards,
        "fa" : "html5"
    },
    "blockchain" :  {
        "name" : "Blockchain",
        "cards" : blockchainCards,
        "fa" : "bitcoin"
    },
    "theory" :  {
        "name" : "Theory",
        "cards" : theoryCards,
        "fa" : "linux"
    },
    "java" :  {
        "name" : "Java",
        "cards" : javaCards,
        "fa" : "terminal"
    },
    "gre" :  {
        "name" : "GRE Vocab",
        "cards" : greCards,
        "fa" : "font"
    },
    "puzzles" : {
        "name" : "Puzzles",
        "cards" : puzzleCards,
        "fa" : "puzzle-piece"
    }
};

export default FlashCardData;