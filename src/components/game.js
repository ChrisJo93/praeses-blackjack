import React, { useState, useEffect } from 'react';
import cards from '../assets/data';

export default function Game() {
  const [state, setState] = useState({
    deck: cards,
    dealerHand: [],
    dealerTotal: 10,
    dealerTurn: null,
    playerHand: [],
    playerTotal: 0,
    playerTurn: null,
    newGame: null,
    stand: null,
  });

  useEffect(() => {
    if (state.dealerHand < 2) {
      hit();
    }
  }, [state.dealerHand]);

  const hit = (e) => {
    setState({
      ...state,
      dealerHand: [
        ...state.dealerHand,
        state.deck[Math.floor(Math.random() * state.deck.length)],
      ],
    });
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
          <button onClick={hit} className="button button_hit">
            Hit
          </button>
          <button onClick={null} className="button button_stand">
            Stand
          </button>
          <button onClick={null} className="button button_stand">
            New Game
          </button>
        </div>
      </div>
    </section>
  );
}
