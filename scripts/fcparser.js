var formatParagraph = function(paragraph) {
    return paragraph;
}

module.exports = {
    parseFile : function(content) {
        var questionSplit = content.split("===QUESTION===");
        var answerSplit = questionSplit[1].split("===ANSWER===");

        var question = answerSplit[0];
        var answer = answerSplit[1];

        return {
            answer : answer,
            question: question
        }
    }
}