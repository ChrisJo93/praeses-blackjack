import React, { useState } from 'react';
import cards from '../assets/data';

export default function Game() {
  const [state, setState] = useState({
    deck: cards,
    dealerHand: [],
    dealerTotal: 0,
    dealerTurn: null,
    playerHand: [],
    playerTotal: 0,
    playerTurn: null,
    newGame: null,
    stand: null,
  });
  const randomizer = (max) => {
    return Math.floor(Math.random() * max);
  };

  console.log(state.deck, 'nice');

  const hit = (hand) => (e) => {
    let newCard;
    newCard = randomizer(cards.id);
    if (newCard !== (state.playerHand || state.dealerHand))
      setState({ ...state, [hand]: newCard });
    else {
    }
  };

  const stand = (person) => (e) => {};

  const newGame = () => {};

  return (
    <section>
      <div className="game_container">
        <div>
          {state.dealerTotal}
          {state.dealerHand.map((card) => (
            <img src={card.image} />
          ))}
        </div>
        <div>
          {state.playerTotal}
          {state.playerHand.map((card) => (
            <img src={card.image} />
          ))}
        </div>
      </div>
    </section>
  );
}
