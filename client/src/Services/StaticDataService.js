let allFlashcardData;

const createCategory = (id, name) => {
    return {
        id: id,
        name: name,
        cards: []
    }
};

const StaticDataService = {
    listeners: [],
    loadCards() {
        return fetch('/api/questions')
            .then(response => response.json())
            .then(data => this.populateCardData(data));
    },
    populateCardData(data) {
        allFlashcardData = {};

        data.categories.data.forEach((catObj) => {
            allFlashcardData[catObj.key] = createCategory(catObj.key, catObj.name);
        });

        data.questions.forEach((q) => {
            allFlashcardData[q.category].cards.push(q);
        });
    },
    addCardChangeListener(listener) {
        this.listeners.push(listener);
    },
    getCards() {
        return allFlashcardData;
    },
    getCard(id, num) {
        var flashcardData = allFlashcardData[id];
        var name, max;
        if (flashcardData) {
            name = flashcardData.name;
            max = flashcardData.cards.length;
        }

        if (this.listeners && this.listeners.length > 0) {
            this.listeners.forEach(function (listener) {
                listener(name, num, max);
            });
        }

        if (flashcardData && flashcardData.cards[num]) {
            return allFlashcardData[id].cards[num];
        }

        return null;
    }
}

export default StaticDataService;