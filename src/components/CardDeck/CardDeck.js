import React, {Component} from "react";
import Card from "../Card/Card";

class CardDeck extends Component {

    cardDeck = () => {

        let cards = [];
        let ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        let suits = ['H', 'D', 'C', 'S'];

        for (let i = 0; i < 13; i++) {
            for (let j = 0; j < 4; j++) {
                let object = {};
                object.rank = ranks[i];
                object.suit = suits[j];
                cards.push(object);
            }
        }
        return cards;
    };

    state = {
        cards: this.cardDeck(),
        part: [],
        text: ''
    };

    getCard = () => {
        let cardsSet = [...this.state.cards];
        let number = Math.floor(Math.random() * cardsSet.length);
        const removedCard = cardsSet.splice(number, 1);
        this.setState({cards: cardsSet});
        return removedCard[0];
    };

    getCards = (numberOfcards) => {
        let currentCards = [];
        while (currentCards.length < numberOfcards) {
            let newCard = this.getCard();
            currentCards.push(newCard);
        }
        this.setState({currentCards, text: ''});
    };

    getUniqueValues = (array) => {
        return [...new Set(array)];
    };

    countSimilars = (array) => {
        const obj = {};
        for (let i = 0; i < array.length; i++) {
            const currentValue = array[i];
            if (obj[currentValue]) {
                obj[currentValue]++
            } else {
                obj[currentValue] = 1
            }
        }
        return obj
    };

    getOutcome = () => {
        let currentCards = [...this.state.currentCards];
        currentCards.sort((a, b) => a.order - b.order).reverse();
        const suits = [];
        const ranks = [];
        const orders = [];

        for (let i = 0; i < currentCards.length; i++) {
            let card = currentCards[i];
            suits.push(card.suit);
            ranks.push(card.rank);
            orders.push(card.order);
        }
        const uniqueSuits = this.getUniqueValues(suits);
        const hasSimilarSuits = uniqueSuits.length === 1;
        const hasRoyalFleshRanks = ranks.includes('10') && ranks.includes('J') && ranks.includes('Q') && ranks.includes('K') && ranks.includes('A')
        if (hasRoyalFleshRanks && hasSimilarSuits) {
            this.setState({text: 'Royal flush!!!'});
            return
        }

        const differencesArray = orders.map((currentValue, index, array) => {
            const next = index === array.length - 1 ? currentValue - 1 : array[index + 1];
            return currentValue - next
        });

        const hasSequentialRanks = this.getUniqueValues(differencesArray).length === 1;
        if (hasSimilarSuits && hasSequentialRanks) {
            this.setState({text: 'Straight flush!!!'});
            return
        }

        const countRanks = this.countSimilars(ranks);
        const countRanksValues = Object.values(countRanks);
        const has4similarRanks = countRanksValues.includes(4);
        if (has4similarRanks) {
            this.setState({text: 'Four of a kind!!!'});
            return
        }

        const has3similarRanks = countRanksValues.includes(3);
        const has2similarRanks = countRanksValues.includes(2);

        if (has3similarRanks && has2similarRanks) {
            this.setState({text: 'Full house!!!'});
            return
        }

        if (hasSimilarSuits) {
            this.setState({text: 'Flush!!!'})
        }

        if (has3similarRanks) {
            this.setState({text: 'Three of a kind!!!'});
            return
        }

        const hasTwoPairs = countRanksValues.length === 3 && this.getUniqueValues(countRanksValues).length === 2;

        if (hasTwoPairs) {
            this.setState({text: 'Two pairs!!!'});
            return
        }

        if (has2similarRanks) {
            this.setState({text: 'One pair!!!'});
            return
        }

        this.setState({text: 'Sorry, try again!!!'});
    };


    render() {
        return (
            <div>
                {this.state.cards.length > 5 ? this.state.part.map((card, key) =>
                        <Card
                            key={key}
                            rank={card.rank}
                            suit={card.suit}
                        />

                    )
                    : <p>No more cards</p>
                }

                <button onClick={() => this.getCards(5)}>Shuffle cards</button>
                {this.state.cards.length > 5?
                    <div>
                        <p>{this.state.text}</p>
                        <button onClick={() => this.getOutcome()}>Show result</button>
                    </div>
                    : <p>To start again reload page</p>
                }
            </div>
        );
    }
}

export default CardDeck;