import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    setState({
      ...state,
      dealerHand: [state.deck[0], state.deck[10], state.deck[50]],
    });
  }, [state.deck]);

  const randomizer = (max) => {
    return Math.floor(Math.random() * max);
  };

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
        <div className="hand_container">
          <div className="score"> Dealer: {state.dealerTotal}</div>
          <div className="hand">
            {state.dealerHand.map((card) => (
              <div className="card_container">
                <img src={card.image} className="cards" />
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="hand_container">
            <div className="hand">
              {state.dealerHand.map((card) => (
                <div className="card_container">
                  <img src={card.image} className="cards" />
                </div>
              ))}
            </div>
            <div className="score">Player: {state.dealerTotal}</div>
          </div>
        </div>
        <div className="buttons">
          <button className="button button_hit">Hit</button>
          <button className="button button_stand">Stand</button>
          <button className="button button_stand">New Game</button>
        </div>
      </div>
    </section>
  );
}
