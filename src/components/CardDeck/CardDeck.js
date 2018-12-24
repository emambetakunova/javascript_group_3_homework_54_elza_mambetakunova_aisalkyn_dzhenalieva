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
        return cardsSet[number];
    };

    getCards = (numberOfcards) => {
        let part = [];
        let cardsSet = [...this.state.cards];
        while (part.length < numberOfcards) {
            let newCard = this.getCard();
            if (newCard !== part[0] && newCard !== part[1] && newCard !== part[2] && newCard !== part[3] && newCard !== part[4]) {
                part.push(newCard);
            } else {
                continue;
            }

            let index = cardsSet.findIndex(card => card.suit === newCard.suit && card.rank === newCard.rank);
            cardsSet.splice(index, 1)
        }
        this.setState({part, cards: cardsSet, text: ''});

    };

    getOutcome = () => {
        let part = [...this.state.part];
        let number = 0;
        let suit1 = part[0].suit;
        if (suit1 === part[1].suit && suit1 === part[2].suit && suit1 === part[3].suit && suit1 === part[4].suit) {
            number = -1;
        }
        for (let j = 0; j < 5; j++) {
            let value = part[j].rank;
            let suit = part[j].suit;

            part.forEach(function (element) {
                if (value === element.rank && suit !== element.suit) {
                    number++;
                }
            });
        }

        let text = '';
        if (number === 2) {
            text = "Congratulations! One pair";
        } else if (number === 4) {
            text = "Well done! Two pairs";
        } else if (number === 6) {
            text = "Well done! Three pairs";
        } else if (number === -1) {
            text = "Flash!";
        } else {
            text = "No pairs found";
        }

        this.setState({text});
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