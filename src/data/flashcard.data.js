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
        "cards" : jsCards
    },
    "blockchain" :  {
        "name" : "Blockchain",
        "cards" : blockchainCards
    },
    "theory" :  {
        "name" : "Theory",
        "cards" : theoryCards
    },
    "java" :  {
        "name" : "Java",
        "cards" : javaCards
    },
    "gre" :  {
        "name" : "GRE",
        "cards" : greCards
    },
    "puzzles" : {
        "name" : "Puzzles",
        "cards" : puzzleCards
    },
    "htmlcss" : {
        "name" : "HTML/CSS",
        "cards" : htmlcssCards
    }
};

export default FlashCardData;