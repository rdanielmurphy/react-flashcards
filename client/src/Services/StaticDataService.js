import FlashCardData from '../data/flashcard.data';

const StaticDataService = {
    listeners: [],
    addCardChangeListener(listener) {
        this.listeners.push(listener);
    },
    getCards() {
        return FlashCardData;
    },
    getCard(id, num) {
        var flashcardData = FlashCardData[id];
        var name, max;
        if (flashcardData) {
            name = flashcardData.name;
            max = flashcardData.cards.questions.length;
        }

        if (this.listeners && this.listeners.length > 0) {
            this.listeners.forEach(function (listener) {
                listener(name, num, max);
            });
        }

        if (flashcardData && flashcardData.cards.questions[num]) {
            return FlashCardData[id].cards.questions[num];
        }

        return null;
    }
}

export default StaticDataService;