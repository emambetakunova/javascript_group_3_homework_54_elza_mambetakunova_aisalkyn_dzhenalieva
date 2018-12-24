import React from "react";
import "./Card.css";


const Card = props => {
    let rank1 = props.rank;
        let suit1 = props.suit;
        let suit2;
    switch (rank1) {
        case "K":
            rank1 = "k";
            break;
        case "Q":
            rank1 = "q";
            break;
        case "J":
            rank1 = "j";
            break;
        case "A":
            rank1 = "a";
            break;
        default:
    }
    switch (suit1) {
        case "H":
            suit1 = "hearts";
            suit2 = "♥";
            break;
        case "D":
            suit1 = "diams";
            suit2 = "♦";
            break;
        case "C":
            suit1 = "clubs";
            suit2 = "♣";
            break;
        case "S":
            suit1 = "spades";
            suit2 = "♠";
            break;
        default:
    }
        const rank = "Card-rank-" + rank1;
        const suit = "Card-" + suit1;
        let array = ["Card"];
        array.push(rank);
        array.push(suit);
        return <div className={array.join(' ')}>
            <span className={["Card-suit", rank].join(" ")}>{props.rank}</span>
            <span className={["Card-rank", suit].join(" ")}>{suit2}</span>


        </div>
    }

;
export default Card;